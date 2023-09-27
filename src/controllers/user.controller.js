import res from "express/lib/response.js";
import userModel from "../dao/models/user.js";
import { userRepoService } from "../repository/index.js";

export const userPremiumController = async (req, res)=>{
    try {
        const userEmail = req.params.uEmail;
        const user = await userModel.findOne({email: userEmail});
        
        if(user.role === "user"){
            if(!user.status === "completo") return res.json({status: "error", message: "No se terminó de cargar toda la documetación requerida"})
            user.role = "premium"
        }else if(user.role === "premium"){
            user.role = "user"
        } else {
            return res.json({status:"error", message:"No es posible cambiar el rol del usuario"});
        }
        
        await userModel.updateOne({_id:user._id},user);
        res.send({status:"success", message:"rol modificado"});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"Hubo un error al cambiar el rol del usuario"})
    }
};

export const userDocumentsController = async (req, res)=>{
    try {
        const userId = req.params.uid
        const user = await userModel.findById(userId);
        const identificacion = req.files['identificacion']?.[0] || null;
        const domicilio = req.files['domicilio']?.[0] || null;
        const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
        const docs = [];
        if(identificacion){
            docs.push({name:"identificacion", reference:identificacion.filename})
        }
        if(domicilio){
            docs.push({name:"domicilio", reference:domicilio.filename})
        }
        if(estadoDeCuenta){
            docs.push({name:"estadoDeCuenta", reference:estadoDeCuenta.filename})
        }
        if(docs.length ===3){
            user.status = "completo"
        }else{
            user.status = "incompleto"
        }

        user.documents = docs;
        const userUpdate = await userModel.findByIdAndUpdate(user._id,user)

        res.json({status:"success", message:"Documentos actualizados"});

    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message: "Hubo un error en la carga de los archivos."});
    };
};

export const usersController = async (req, res) =>{
    try {
        const usersDb = await userModel.find().lean();
        const users = [];

        for (let i = 0; i < usersDb.length; i++) {
            const user = usersDb[i];
            const userDto = await userRepoService.getUserRepository(user)
            console.log(userDto)
            users.push(userDto)
        }

        res.json({ status: "success", message: "Se obtuvieron todos los usuarios", payload: users})

    } catch (error) {
        req.logger.error('Get users failed');
        res.json({status: "error", message: "Se produjo un error, no se obtuvieron los usuarios"})
    }
}

export const usersDeleteController = async (req, res) =>{
    const usersDb = await userModel.find().lean();
    const dateNow = new Date();
    const dateExpired = dateNow.setHours(dateNow.getHours() - 2);

    const usersExpired = usersDb.filter(user => user.last_connection <= dateExpired)

    for (let i = 0; i < usersExpired.length; i++) {
        const user = usersExpired[i];
        await userModel.deleteOne({_id: user._id})   
    }

    res.json({status: "success", message: "Se eliminaron los usuarios correspondientes", payload: usersExpired})
}

export const userDeleteController = async (req, res) =>{
    const user = req.params.user

    const userDelete = await userModel.deleteOne({ email: user })

    res.json({status: 'success', message: 'Se eliminó el usuario correspondiente', payload: userDelete})
}