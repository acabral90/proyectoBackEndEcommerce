import userModel from "../dao/models/user.js";

export const lastConnection = async (req, res, next) => {
    
    const uid = req.user._id;
    const user = await userModel.findOne({_id: uid});
    let date = "";

    if(req.url == '/'){
        date = new Date()     
    }
    if(req.url == '/logout'){
        date = new Date()
    }

    user.last_connection = date;
    
    await userModel.updateOne({_id: uid}, {$set: user});

    next()
};
