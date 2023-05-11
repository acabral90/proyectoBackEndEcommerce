import productModel from "../models/products.js";

export default class ProductManager {

    async getProducts(){

        const products = await productModel.find().lean();

        return products
    }

    async getProductById(pid){

        const products = await this.getProducts();
        
        let filterProduct = products.filter(product => product.id == pid)

        return filterProduct
    }

    async addProducts (item){

        const {title, description, price, stock, category} = item

        if(!title || !description || !price || !stock || !category){
            
            return ('Se deben completar todos los campos')

        }else{
            
            const product = await productModel.create(item);
            
            return product
        } 

    }

    updateProduct = async (product, pid) =>{
        const {title, description, price, thumbnail, code, stock} = product

        const products = await this.getProducts();
        
        let findProduct = products.find(item => item.id == pid)

        if(title){
            findProduct.title = title
        }if(description){
            findProduct.description = description
        }if(price){
            findProduct.price = price
        }if(thumbnail){
            findProduct.thumbnail = thumbnail
        }if(code){
            findProduct.code = code
        }if(stock){
            findProduct.stock = stock
        };

        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        return findProduct
    }

    deleteProduct = async (productId) =>{

        console.log(productId._method)

        const result = await productModel.deleteOne({_id: productId._method})

        return result 
    }

}