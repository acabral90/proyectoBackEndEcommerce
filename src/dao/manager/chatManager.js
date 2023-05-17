import chatModel from "../models/messages.js"

export default class ChatManager{
    
    async createMessage(data){

        //console.log(data)

        const messages = await chatModel.create(data);

        return messages
    }

    async getMessages(){
        const messages = await chatModel.find().lean()

        return messages
    }
}