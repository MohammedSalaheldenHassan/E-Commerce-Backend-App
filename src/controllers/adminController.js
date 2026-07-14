import {prisma} from "../config/db.js";

export const getDashboardStats = async (req, res) => {
    const userRole = 'user';
    try{
        const users = await prisma.user.count();
        const products = await prisma.product.count();
        const categories = await prisma.category.count();
        const order = await prisma.orders.count();
        return res.status(200).json({
            success: true,
            data:{
                users,
                products,
                categories,
                order
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const fetchUsers = await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                role:true
            }
        });
        if(fetchUsers.length === 0){
            return res.status(200).json({
                message: "No users yet"
            });
        }
        return res.status(200).json({
            success: true,
            message: "users fetched successfully",
            data: fetchUsers
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:  "Internal Server Error"
        });
    }
}

export const getUserById = async (req, res) => {
    const {userId} = req.params;
    try{
        const getUserId = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select:{
                id: true,
                name:true,
                email:true,
                role:true
            }
        });
        if(!getUserId){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user fetched seccessfully",
            data: getUserId
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateUserRole = async (req, res) => {
    const {userId} = req.params;
    const {userRole} = req.body;
    try{
        const findUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!findUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }
        const updateRole = await prisma.user.update({
            where:{
                id: userId
            },
            data:{
                role: userRole
            }
        });
        return res.status(200).json({
            success: true,
            message: "Role updated successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const deleteUser = async (req, res) => {
    const {userId} = req.params;
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if(user.role === "admin"){
            return res.status(403).json({
                success:false,
                message:"You cannot delete another admin"
            });
        }
        if(user.id === req.user.id){
            return res.status(400).json({
                success:false,
                message:"You cannot delete your own account"
            });
        }
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export const getAllOrders = async (req, res) => {

}
export const updateOrderStatus = async (req, res) => {

}