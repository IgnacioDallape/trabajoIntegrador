import { addMessageService, deleteAllMessagesService, getMessageService } from "../services/chat.service"



const getMessage = async (req, res) => {
    try {
        const messages = await getMessageService();
        res.send(messages);
    } catch (err) {
        return false
    }
}

const addMessage = async (req, res) => {
    try {
        const messages = await addMessageService();
        res.send(messages);
    } catch (err) {
        return false
    }
}

const deleteAllMessages = async (req, res) => {
    try {
        const messagesDeleted = await deleteAllMessagesService();
        if(!messagesDeleted) return false
        let messages = await getMessageService()
        res.send(messages);
    } catch (err) {
        return false
    }
}

export {
    addMessage, getMessage, deleteAllMessages
}