import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    
    title:{ type: String, require: true },
    description:{ type: String, require: true },
    price:{ type: Number, require: true },
    stock:{ type: Number, require: true },
    category:{ type: String, require: true },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: 'admin'
    },
    thumbnails: { 
        type: Array,
        default: []
    }
})

productsSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollection,productsSchema);

export default productModel;