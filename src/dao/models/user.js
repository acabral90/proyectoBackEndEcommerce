import mongoose from 'mongoose';

const collection = 'User';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, require: true},
    age: Number,
    password: String,
    cart: {
        type: [
            {
                cart:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'carts'
                }
            }
        ],
        default: []
    },
    role: {type: String, default: 'user'}
})

const userModel = mongoose.model(collection, schema);

export default userModel;