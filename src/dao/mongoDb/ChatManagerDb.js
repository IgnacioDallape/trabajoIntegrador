const Chat = require('../models/Chat')

class ChatManager{
    constructor(){
        this.chat
    }

    async addMessage(message){
        try{
            console.log('llego la data', message)
            let addingMsg = await new Chat(message)
            addingMsg =  addingMsg.save()
            if(!addingMsg){
                console.log('no se pudo enviar el mensaje')
                return false
            }
            return addingMsg
        } catch (err) {
            console.log(err, 'error en addProducts en chat')
            return false
        }
    }

    async getMessage(){
        try{
            let messages = await Chat.find({})
            if(!messages){
                console.log('mensajes esta vacio')
                return messages = []
            }
            return messages

        } catch (err) {
            console.log(err, 'error en getMessage en chat')
            return false
        }
    }
}

module.exports = ChatManager