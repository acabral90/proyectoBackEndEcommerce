import mongoose from "mongoose";

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    products:{
        type: Array,
        default: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products' 
                }
            }
        ]
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;