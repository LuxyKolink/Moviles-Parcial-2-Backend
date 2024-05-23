import Message from "../../../database/models/message-sequelize";
import IMessage from "../../interfaces/message-interface";

export default class MessageModel {

    getById = async (id: number): Promise<IMessage | null> => {
        try {
            if (id <= 0) {
                console.error('Id debe ser número positivo.');
                return null;
            }

            const message = await Message.findByPk(id);

            if (!message) {
                console.error(`No hay registro de mensaje con ID=${id}`);
                return null;
            }
            return message;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    getAll = async (page: number): Promise<IMessage[]> => {
        try {
            const limit = Number(process.env.LIMIT);
            const offset = limit * (page - 1);
            const messages = await Message.findAll({
                limit: limit,
                offset: offset
            });
            return messages;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    create = async (message: IMessage): Promise<IMessage | null> => {
        try {
            const newMessage = await Message.create({
                title: message.title,
                body: message.body,
                senderEmail: message.senderEmail,
                recipientEmail: message.recipientEmail,
                recipientToken: message.recipientToken,
                pushResult: message.pushResult
            });
            return newMessage;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    update = async (id: number, message: Partial<IMessage>): Promise<IMessage | null> => {
        try {
            const existingMessage = await Message.findByPk(id);

            if (!existingMessage) {
                console.error(`No se encontró el mensaje con ID=${id}`);
                return null;
            }

            await existingMessage.update(message);
            return existingMessage;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    delete = async (id: number): Promise<boolean> => {
        try {
            const result = await Message.destroy({
                where: { id: id }
            });
            return result > 0;
        } catch (error) {
            console.error(error);
        }
        return false;
    }
}
