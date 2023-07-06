import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema({
    code: String,
    purchase_datetime: String,
    amount: Number,
    purchaser: String,
    products: {
        type: Array,
        default: []
    }
});

const ticketModel = mongoose.model(collection, schema);
export default ticketModel;