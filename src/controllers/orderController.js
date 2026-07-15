import { prisma } from "../config/db.js";

export const createOrder = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await prisma.cart.findUnique({
            where: {
                user_id: userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }
        // Check stock and calculate total
        let totalPrice = 0;
        for (const item of cart.items) {
            if (item.quantity > item.product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for ${item.product.title}`
                });
            }
            totalPrice += Number(item.product.price) * item.quantity;
        }
        // Create order
        const order = await prisma.orders.create({
            data: {
                user_id: userId,
                total_price: totalPrice,
                order: {
                    create: cart.items.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.product.price
                    }))
                }
            },
            include: {
                order: true
            }
        });
        // Update product stock
        for (const item of cart.items) {
            await prisma.product.update({
                where: {
                    id: item.product_id
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }
        // Clear cart
        await prisma.cartItems.deleteMany({
            where: {
                cart_id: cart.id
            }
        });
        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getMyOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await prisma.orders.findMany({
            where: {
                user_id: userId
            },
            include: {
                order: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            },
            include: {
                order: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        // Security check
        if (order.user_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not allowed"
            });
        }
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            }
        });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        if (order.user_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not allowed"
            });
        }
        if (order.status !== "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Cannot cancel this order"
            });
        }
        const cancelled = await prisma.orders.update({
            where: {
                id: orderId
            },
            data: {
                status: "DELIVERED"
            }
        });
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: cancelled
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};