import ProductManager from "../dao/manager/productManager.js";
import CartManager from "../dao/manager/cartManager.js";
import userModel from "../dao/models/user.js";
import cartModel from "../dao/models/carts.js";
import ticketModel from "../dao/models/tickets.js";
import productModel from "../dao/models/products.js";

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
    let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result;
    const user = await userModel.findOne({email: req.session.user.email}).lean();
    
    console.log(req.session.user)

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
        admin: user.role === 'admin'
    })
}

export const getCartController = async (req, res)=>{

    const user = req.session.user;
    const userDb = await userModel.findOne({email: user.email}).lean();   
    const cart = await cartManager.getCarts(userDb.cart[0]._id);
    
    res.render('cart',{
        status: 'success',
        cart,
        userDb,
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

export const usersViewsController = async ( req, res )=>{
    const users = await userModel.find().lean()
    const user = req.session.user
    const userDb = await userModel.findOne({email: user.email}).lean()
    const admin = users.find( client => client.email === user.email)
    if(admin.role === 'admin' & !admin.admin) admin.admin = true
    
    res.render('users', {
        userDb,
        users,
        style: 'style.css',
        admin: user.role === 'admin'
    })
};

export const purcharseOrderController = async ( req, res )=>{
    const tcode = req.params.tid;
    const cart_id = req.session.user.cart[0]._id;
    const email = req.session.user.email;
    const user = await userModel.findOne({email: email}).lean();   
    
    const ticket = await ticketModel.findOne({code: tcode}).lean();
    let cart = await cartModel.findOne({_id: cart_id}).lean().populate('products.product');
    const cart2 = {...cart};
    cart2.products = [];
    

    for (let i = 0; i < cart.products.length; i++) {
        const product = cart.products[i];

        product.total_price = product.quantity * product.product.price

    };

    const clearCart = await cartModel.updateOne({_id: cart_id}, {$set: cart2});

    res.render('purchaseOrder', {
        ticket,
        cart,
        user,
        style: 'style.css',
    })
}