import { Request, Response } from "express";
import { getMessaging } from "firebase-admin/messaging";

export default class MessageController {

    constructor() {

    }

    sendMessage = async (req: Request, res: Response) => {
        const receivedToken = req.body.fcmToken;

        const message = {
            notification: {
                title: "Notif",
                body: 'This is a Test Notification'
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
    }

}