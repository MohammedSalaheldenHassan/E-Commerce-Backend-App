import { prisma } from '../config/db.js';

export const getProduct = async (req, res) => {
    try {
        const product = await prisma.product.findMany();
        res.status(200).json({
            success: true,
            count: product.length,
            data: product,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
export const productById = async(req,res)=>{
    const {productId} = req.params;
    try{
        const getproudctbyid = await prisma.product.findUnique({
            where:{id: productId},
        });
        res.status(200).json({
            success: true,
            count: getproudctbyid.length,
            data: getproudctbyid,
        })
    }catch(e){
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
}
export const getProductByCetagory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const productByCetagory = await prisma.product.findMany({
            where: { category_id: categoryId },
            include: {
                category: true,
            }
        })
        if (productByCetagory.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No products found for this category.",
            });
        }
        res.status(200).json({
            success: true,
            count: productByCetagory.length,
            data: productByCetagory,
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }

}

export const createProduct = async (req, res) => {
    const { title, description, price, stock, image_url } = req.body;
    const newProduct = await prisma.product.create({
        data: {
            title,
            description,
            price,
            stock,
            image_url,
        }
    })
    res.status(201).json({
        message: "product succesfly add it",
        status: "Success",
        data: {
            newProduct,
        },
    });
}