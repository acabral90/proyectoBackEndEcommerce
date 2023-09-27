import ProductManager from "../dao/manager/productManager.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorInfo } from "../services/productErrorInfo.js";
import productModel from "../dao/models/products.js";
import userModel from "../dao/models/user.js";
import { sendProductDelete } from "../utils/email.js";

const productManager = new ProductManager();

export const getProductsController = async (req, res)=>{
    try {
      const category = req.query;
      const { page = 1 } = req.query; 
      let { result, code, status } = await productManager.getProductsPaginate(page, category);
      req.logger.info('Get products success')
      res.status(200).send({status, code, payload: result})

    } catch (error) {
      req.logger.error('Get products failed')
      res.status(400).send({status: 'error', payload: error})
    }
};

export const getProductController = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    req.logger.info('Get product success', product)
    res.status(200).send({status: 'success', payload: product})
    
  } catch (error) {
    req.logger.error('Get product failed')
    res.status(400).send({status: 'error', payload: error})
  }
};

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
      req.logger.info('Product create success');
      res.status(200).send({status, code, payload: result});

    } catch (error) {
      req.logger.error('Product create error');
      res.status(400).send({status: "error", code: error.code, payload: error.cause});
    }
  };

export const deleteProductController = async (req,res)=>{
    try {
      const productId = req.params.pid;
      const product = await productModel.findOne({_id: productId}).lean();
      if(product){
        const productOwner = JSON.parse(JSON.stringify(product.owner));
        const userId = JSON.parse(JSON.stringify(req.user._id));
        const owner = await userModel.findOne({_id: productOwner}).lean();
        if((req.user.role === "premium" && productOwner == userId) || req.user.role === "admin"){
          const { code, status, result } = await productModel.deleteOne({_id: productId})
          const sendEmail = await sendProductDelete(owner.email, product)
          req.logger.info('Product delete success')
          res.status(200).send({code, status, payload: {result}})
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
    const productId = req.params.pid;
    const newProduct = req.body
    
    req.logger.info(productId)
    const { code, status, result } = await productManager.updateProduct(productId, newProduct)
    req.logger.info('Product update success')
    res.status(200).send({code, status, payload: result})
    
  } catch (error) {
    req.logger.error('Product update failed')
    res.status(400).send({code, status, payload: error})
  }
};

export const uploadImagesController = async (req, res) =>{
  try {
    const pid = req.params.pid;
    const product = await productModel.findById({_id: pid}).lean();
    if(!product.thumbnails){
      product.thumbnails = []
    }
    const images = req.files['images'];

    if(images){
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        product.thumbnails.push({name: 'image', reference: image.filename})   
      };
    };
    const uploadProduct = await productModel.updateOne({_id: pid},{$set: product});
    console.log(uploadProduct);
    
    res.json({status: 'success', message: 'Upload images success'});
    
  } catch (error) {
    req.logger.error('Upload images failed')
    res.status(400).send({payload: error})
  }
}




