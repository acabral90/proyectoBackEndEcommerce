import productModel from "../models/products.js";



export default class ProductManager{

    async getProducts(){
        const products = await productModel.find().lean();

        return products
    }

    async getProductById(pid){
        const product = await productModel.findOne(pid).lean()
        console.log(product)
        return product    
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

    updateProduct = async (productId, newProduct) =>{
        const {title, description, price, stock, category} = newProduct

        const dbProduct = await productModel.findById({_id: productId}).lean();

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

        const result = await productModel.updateOne({_id: productId}, dbProduct);
            
        return {
            code:202,
            status: 'success',
            result
        }
           
    };

    deleteProduct = async (id) =>{
        
        const result = await productModel.deleteOne({_id: id})

        return {
            code:202,
            status: 'success',
            result
        }
    
    };

}