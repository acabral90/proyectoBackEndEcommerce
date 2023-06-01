import productModel from "../models/products.js";



export default class ProductManager {

    async getProducts(){

        const products = await productModel.find().lean();

        return products
    }

    async getProductById(){

        const pid = await addToCart();

        console.log(pid);

        const products = await this.getProducts();
        
        let filterProduct = products.filter(product => product._id == pid);

        return filterProduct
    }

    async getProductsPaginate(page, category){

        if(Object.keys(category).length === 0 || category.categorias === undefined || category.categorias === 'Todas'){
            
            const result = await productModel.paginate({}, {limit:4, page, lean:true});
        
            return {
                code: 202,
                status: 'success',
                result
            }
        }else{
            const { categorias } = category

            let result = await productModel.paginate({category: categorias}, {limit:4, page, lean:true});

            return {
                code: 202,
                status: 'success',
                result
            }
        }      
    }

    async addProducts (item){

        const {title, description, price, stock, category} = item

        if(!title || !description || !price || !stock || !category){
            
            return ('Se deben completar todos los campos')

        }else{
            
            const result = await productModel.create(item);
            
            return{
                code: 202,
                status: 'success',
                result
            }
        } 

    }

    updateProduct = async (product) =>{
        const {title, description, price, stock, id, category} = product

        const dbProduct = await productModel.findById({_id: id}).lean();

        if(title){
            dbProduct.title = title;
        }if(description){
            dbProduct.description = description;
        }if(price){
            dbProduct.price = price;
        }if(stock){
            dbProduct.stock = stock;
        }if(category){
            dbProduct.category = category
        }

        const result = await productModel.updateOne({_id: id}, dbProduct);
            
        return {
            code:202,
            status: 'success',
            result
        }
           
    };

    deleteProduct = async (productId) =>{

        if(productId._method){

            const result = await productModel.deleteOne({_id: productId._method});

            return {
                code:202,
                status: 'success',
                result
            }
        }else if(productId._id){

            const result = await productModel.deleteOne({_id: productId._id})

            return {
                code:202,
                status: 'success',
                result
            }
        }
    };

}