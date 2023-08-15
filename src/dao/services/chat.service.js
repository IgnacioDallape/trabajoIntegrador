import { ChatManager } from "../mongoDb/ChatManagerDb.js";
const dbChat = new ChatManager();

const getMessageService = async () =>{
    try{
        let messages = await dbChat.getMessage()
        console.log('mensajes obtenidos:', messages);
        return messages
    } catch (err) {
        console.log('error en router de getMessage chat')
        return err
    }
}

const addMessageService = async () =>{
    try{
        let messages = await dbChat.addMessage()
        console.log('mensajes obtenidos:', messages);
        return messages
    } catch (err) {
        console.log('error en router de addMessage chat')
        return err
    }
}

const deleteAllMessagesService = async () => {
    try {
        let deleting = await dbChat.deleteAllMessages()
        if(!deleting) return false
        return true
    } catch (error) {
        console.log('error en router de addMessage chat')
        return err
    }
}

export {
    addMessageService, getMessageService, deleteAllMessagesService
}


