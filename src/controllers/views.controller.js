import ProductManager from "../dao/manager/productManager.js";
import CartManager from "../dao/manager/cartManager.js";
import userModel from "../dao/models/user.js";

const manager = new ProductManager();
const cartManager = new CartManager();

export const getChatController = async (req, res)=>{
    const user = req.session.user.first_name
    res.render('chat', {user, style: 'style.css'})
};

export const getProductsController = async (req, res)=>{

    const category = req.query;
    const { page = 1 } = req.query; 
    let { result, code, status } = await manager.getProductsPaginate(page, category);
    let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result
    const user = req.session.user.first_name

    return  res.render( 'products', {
        status: status,
        docs,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        categoryExist: category.categorias === 'camisetas',
        style: 'style.css',
        user,
    })
}

export const getCartController = async (req, res)=>{

    const user = req.session.user;
    const userDb = await userModel.findOne({email: user.email});   
    const cart = await cartManager.getCarts(userDb.cart[0]._id);
    
    res.render('cart',{
        status: 'success',
        cart,
        style: 'style.css'
    });
};

export const updateCartController = async (req, res)=>{

    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cartManager.updateCart(cid, pid);
    const cart = await cartManager.getCarts(cid);
    
    res.status(200).send({
        status: 'success',
        payload: cart
    })   
}

export const registerController = (req,res)=>{
    res.render('register',{
        style:'style.css'
    })
};

export const loginController = async (req,res)=>{
    res.render('login')
};

export const profileController = (req,res)=>{
    console.log(req.session.user)
    res.render('profile',{
        user: req.session.user,
    })
};

export const forgotPasswordController = (req, res)=>{
    res.render('forgotPassword');
};

export const resetPasswordController = (req, res)=>{
    const token = req.query.token
    res.render("resetPassword",{token})
}