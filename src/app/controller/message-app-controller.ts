import { Request, Response } from "express";
import { getMessaging } from "firebase-admin/messaging";
import UserModel from "../model/user-app-model";
import FcmTokenModel from "../model/fcm-token-app-model";
import MessageModel from "../model/message-app-model";

export default class MessageController {

    constructor(
        private readonly userModel: UserModel,
        private readonly fcmTokenModel: FcmTokenModel,
        private readonly messageModel: MessageModel
    ) {

    }

    sendMessageOld = async (req: Request, res: Response) => {

        const receivedToken = req.body.fcmToken;

        try {
            const message = {
                notification: {
                    title: "Notif",
                    body: 'Hola profe'
                },
                token: "dWiXz6dcQqqIvLVuQFtvId:APA91bGoQTAXJEDJvHqiQh7e5RFna7YYA6_9LLXS9V_TFGPWGHtYmy6Nm-sGhm07cgh14oK5MFoSU0DS7wQI5UPGAhybn7PBVl8eGEImdCPTWjlhfHEcwACh1IaG3WAaZyDSfjk_Uod0",
            };

            getMessaging()
                .send(message)
                .then((response) => {
                    res.status(200).json({
                        message: "Successfully sent message",
                        token: receivedToken,
                    });
                    console.log("Successfully sent message:", response);
                })
                .catch((error) => {
                    res.status(400);
                    res.send(error);
                    console.log("Error sending message:", error);
                });
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    sendMessage = async (req: Request, res: Response) => {
        const { senderEmail, recipientEmail, title, body } = req.body;

        try {

            const sender = await this.userModel.getByParam('email', senderEmail);
            const recipient = await this.userModel.getByParam('email', recipientEmail);

            if (!sender || !recipient) {
                res.status(404).json({ message: 'Remitente o destinatario no encontrado' });
            }

            const recipientTokens = await this.fcmTokenModel.getByUserEmail(recipientEmail);

            if (!recipientTokens || recipientTokens.length === 0) {
                res.status(404).json({ message: 'No se encontraron tokens FCM para el destinatario' });
            }

            const sendPromises = recipientTokens.map(async (token) => {
                const message = {
                    notification: {
                        title: title,
                        body: body,
                    },
                    token: token.token,
                };

                try {
                    const response = await getMessaging().send(message);
                    await this.messageModel.create({
                        title: title,
                        body: body,
                        senderEmail: sender!.email,
                        recipientEmail: recipient!.email,
                        recipientToken: token.token,
                        pushResult: response,
                    });

                    return { 
                        token: token.token, 
                        result: response 
                    };
                } catch (error) {
                    console.error("Error sending message:", error);
                    await this.messageModel.create({
                        title: title,
                        body: body,
                        senderEmail: sender!.email,
                        recipientEmail: recipient!.email,
                        recipientToken: token.token,
                        pushResult: String(error),
                    });

                    return { 
                        token: token.token, 
                        result: String(error) 
                    };
                }
            });

            const results = await Promise.all(sendPromises);
            res.status(200).json({
                message: "Mensajes enviados con éxito",
                results,
            });
        } catch (error) {
            console.error("Error en sendMessage:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

}