import cartModel from "../models/carts.js";
import userModel from "../models/user.js";


export default class CartManager{

    async createCart(){
        const cart = await cartModel.create({});
        
        return cart
    }

    async getCarts(cid){
        console.log(cid)
        if(cid){
        return await cartModel.findOne({_id:cid}).lean().populate('products.product');
        }else{
        return await cartModel.find().lean().populate('products.product');
        }       
        
    }

    async updateCart(cid, pid){
 
        const cart = await cartModel.find({_id:cid}).lean().populate('products.product');

        console.log(cart[0]);

        const prodIndex = cart[0].products.findIndex(product => product.product._id == pid);

        console.log(prodIndex);

        if (prodIndex === -1){
            const product = {
                product: pid,
                quantity: 1
            }
            cart[0].products.push(product);
        } 
        else {
            let total = cart[0].products[prodIndex].quantity;
            cart[0].products[prodIndex].quantity = total + 1;
        }

        const newCart = await cartModel.updateOne({_id:cid}, {$set:cart[0]})

        console.log(newCart)
        
        return newCart
        
    };

    async updateApiCart(cart, newCart){

        cart[0].products = [];

        cart[0].products.push(newCart)

        const result = await cartModel.updateOne({_id:cart[0]._id}, {$set:cart[0]})

        return result        
    }

    async updateProdQuantity(pid, newQuantity, cid){
        const cart = await cartModel.findOne({_id : cid}).lean()
        const prodIndex = cart.products.findIndex(product => product.product == pid);
        
        if(prodIndex === -1){
            const newProd = {
                product : pid,
                quantity : 1
            };

            cart.products.push(newProd)
        }else{
            if(!newQuantity.quantity){
                cart.products[prodIndex].quantity += 1
            }else{
                cart.products[prodIndex].quantity = newQuantity.quantity
            }
        }
        
        const result = await cartModel.updateOne({_id: cart._id}, {$set:cart})

        return result
    };

    async deleteProductCart(cid, pid){
 
        const cart = await cartModel.find({_id:cid}).lean().populate('products.product');
        //console.log(cart[0].products)
        const productIndex = cart[0].products.findIndex(product => product.product._id.equals(pid));
        //console.log(productIndex)
        if (productIndex === -1){
    
        } 
        else {
            
            cart[0].products.splice(productIndex,1)
        }
        //console.log(cart[0])
        const result = await cartModel.updateOne({_id:cart[0]._id}, {$set:cart[0]})
        //console.log(result)
        return result

    };

    async clearProductsInCart(cid){

        const cart = await cartModel.findOne({_id:cid});

        const result = await cartModel.updateOne({_id:cid}, {$set:{products:[]}})

        return result

    }

}

    