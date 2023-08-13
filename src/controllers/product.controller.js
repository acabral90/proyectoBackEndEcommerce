import ProductManager from "../dao/manager/productManager.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorInfo } from "../services/productErrorInfo.js";

const productManager = new ProductManager();

export const getProductsController = async (req, res)=>{
    try {
      const category = req.query;
      const { page = 1 } = req.query; 
      let { result, code, status } = await productManager.getProductsPaginate(page, category);

      res.status(200).send({status, code, payload: result})
    } catch (error) {
      req.logger.error('Get product failed')
      res.status(400).send({payload: error})
    }
    
}

export const createProductController = async (req, res) => {
    try {
      const product = req.body;
      product.owner = req.user._id
   
      if (!product.title || !product.description || !product.price || !product.stock || !product.category) {
        CustomError.createError({
          name: "Product create error",
          cause: generateProductErrorInfo(product),
          message: "Error creando el producto",
          errorCode: EError.INVALID_JSON,
        });
      }  
      const { result, code, status } = await productManager.addProducts(product);
      req.logger.info('Product create success')
      res.status(200).send({status, code, payload: result})

    } catch (error) {
      res.status(400).send({status: "error", code: error.code, payload: error.cause});
    }
  };

export const deleteProductController = async (req,res)=>{
    try {
      const product = req.body;
      req.logger.info(product)
      if(product){
        const productOwer = JSON.parse(JSON.stringify(product.owner));
        const userId = JSON.parse(JSON.stringify(req.user._id));
        if((req.user.rol === "premium" && productOwer == userId) || req.user.rol === "admin"){
          const { code, status, result } = await productManager.deleteProduct(product)
          req.logger.info('Product delete success')
          res.status(200).send({code, status, payload: result})
        }else{
          req.logger.error('Cannot delete this product')
          res.status(400).send({payload: 'error'})
        };
      }else{
        req.logger.error('Product does not exist')
        res.status(400).send({payload: 'error'})
      };
    } catch (error) {
      req.logger.error('Product delete failed')
      res.status(400).send({payload: error})
    }   
}

export const updateProductController =  async (req,res)=>{

  try {
    const product = req.body;
    req.logger.info(product)
    const { code, status, result } = await productManager.updateProduct(product)
    req.logger.info('Product update success')
    res.status(200).send({code, status, payload: result})
    
  } catch (error) {
    req.logger.error('Product update failed')
    res.status(400).send({code, status, payload: error})
  }
}




