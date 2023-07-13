import ProductManager from "../dao/manager/productManager.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorInfo } from "../services/productErrorInfo.js";

const productManager = new ProductManager();

export const getProductsController = async (req, res)=>{

    const category = req.query;
    //console.log(category)
    const { page = 1 } = req.query; 
    let { result, code, status } = await productManager.getProductsPaginate(page, category);

    res.send({
        status,
        code,
        payload: result
    })
}

export const createProductController = async (req, res) => {

    const product = req.body;

    if(!product.title || !product.description || !product.price || !product.stock || !product.category){
        CustomError.createError({
            name: "Product create error",
            cause: generateProductErrorInfo(product),
            message: "Error creando el producto",
            errorCode: EError.INVALID_JSON
        });
    };

    const { result, code, status} = await productManager.addProducts(product)

    

    res.send({
        status,
        code,
        payload: result
    })
}

export const deleteProductController = async (req,res)=>{
    
    const product = req.body;
    console.log(product)
    const { code, status, result } = await productManager.deleteProduct(product)

    res.send({
        code,
        status,
        payload: result
    })
}

export const updateProductController =  async (req,res)=>{

    const product = req.body;
    console.log(product)
    const { code, status, result } = await productManager.updateProduct(product)

    res.send({
        code,
        status,
        payload: result
    })
}

