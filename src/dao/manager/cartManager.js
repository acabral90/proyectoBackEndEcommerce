import cartModel from "../models/carts.js";

export default class CartManager{

    async createCart(){
        const cart = await cartModel.create({});

        return cart
    }

    async getCarts(){

        const carts = await cartModel.find().populate('products.product');

        return carts
    }

    async getCartsById(cid){
        const cart = await cartModel.findOne({_id:cid});

        return cart
    }

    async updateCart(cid, pid){

        console.log(cid, pid)
 
        const cart = await cartModel.findOne({_id:cid});

        console.log(cart)

        const prodIndex = cart.products.findIndex(u=>u._id == pid);

        console.log(prodIndex)

        if (prodIndex === -1){
            const product = {
                _id: pid,
                quantity: 1
            }
            cart.products.push(product);
        } 
        else {
            let total = cart.products[prodIndex].quantity;
            cart.products[prodIndex].quantity = total + 1;
        }

        const result = await cartModel.updateOne({_id:cid}, {$set:cart})

        

        return cart
        
    };

    async deleteProductCart(cid, pid){
 
        const cart = await cartModel.findOne({_id:cid})

        const productIndex = cart.products.findIndex(product => product._id === pid);

        if (productIndex === -1){
    
        } 
        else {
            
            cart.products.splice(productIndex,1)
        }

        const result = await cartModel.updateOne({_id:cid},{$set:cart})
        
        return cart.products

    };

    async clearProductsInCart(cid){

        const cart = await cartModel.findOne({_id:cid});

        const result = await cartModel.updateOne({_id:cid}, {$set:{products:[]}})

        return result

    }

}

    