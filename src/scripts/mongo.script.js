import productModel from "../dao/models/products.js";
import mongoose from "mongoose";
import { options } from "../config/options.config.js";

const MONGO = options.mongoDB.url;
const connection = mongoose.connect(MONGO);

const updateProducts = async() =>{

    try {
        const adminId = "64a3817e072f66f66aff961a"
        const result = await productModel.updateMany({},{$set:{owner:adminId}})
        console.log("Result", result)
        
    } catch (error) {
        console.log(error.message)
    }

}
updateProducts();