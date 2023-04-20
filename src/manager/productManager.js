import fs from 'fs';

const path = './src/products/products.json';
        

export default class ProductManager {

    getProducts = async () =>{
        if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(data);
        return products;
        }else{
            return [];
        }
    }

    getProductById = async (pid) =>{

        const products = await this.getProducts();
        
        let filterProduct = products.filter(product => product.id == pid)

        return filterProduct

    }

    addProducts = async (product) =>{

        console.log(product)

        const products = await this.getProducts();

        const {title, description, price, stock, category} = product

        if(products.length === 0){
            product.id = 1
        }else{
            product.id = products[products.length-1].id+1;
        };

        if(!title || !description || !price || !stock || !category){
            
            return ('Se deben completar todos los campos')

        }else{
            products.push(product);
        
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        
            return products
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

        console.log(productId)

        const products = await this.getProducts();

        let productIndex = products.findIndex((items) => items.id == productId._method)

        console.log(productIndex)

        let productoEliminado = products.splice(productIndex, 1)

        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
    
        return products

    }

}

   