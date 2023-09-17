import userModel from "../dao/models/user.js";

export const userPremiumController = async (req, res)=>{
    try {
        const userId = req.params.uid;
        const user = await userModel.findById(userId);
        
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
