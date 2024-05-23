import FcmToken from "../../../database/models/fcm-token-sequelize";
import IFcmToken from "../../interfaces/fcm-token-interface";

export default class FcmTokenModel {

    getById = async (id: number): Promise<IFcmToken | null> => {
        try {
            if (id <= 0) {
                console.error('Id debe ser número positivo.');
                return null;
            }

            const fcmToken = await FcmToken.findByPk(id);

            if (!fcmToken) {
                console.error(`No hay registro de FcmToken con ID=${id}`);
                return null;
            }
            return fcmToken;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    getByUserEmail = async (email: string): Promise<IFcmToken[]> => {
        try {
            if (!email) {
                console.error('El correo electrónico es requerido.');
                return [];
            }

            const fcmTokens = await FcmToken.findAll({
                where: {
                    userEmail: email
                }
            });

            return fcmTokens;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    getAll = async (page: number): Promise<IFcmToken[]> => {
        try {
            const limit = Number(process.env.LIMIT);
            const offset = limit * (page - 1);
            const fcmTokens = await FcmToken.findAll({
                limit: limit,
                offset: offset
            });
            return fcmTokens;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    create = async (fcmToken: IFcmToken): Promise<IFcmToken | null> => {
        try {
            const newFcmToken = await FcmToken.create({
                token: fcmToken.token,
                userEmail: fcmToken.userEmail
            });
            return newFcmToken;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    update = async (id: number, fcmToken: Partial<IFcmToken>): Promise<IFcmToken | null> => {
        try {
            const existingFcmToken = await FcmToken.findByPk(id);

            if (!existingFcmToken) {
                console.error(`No se encontró el FcmToken con ID=${id}`);
                return null;
            }

            await existingFcmToken.update(fcmToken);
            return existingFcmToken;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    delete = async (id: number): Promise<boolean> => {
        try {
            const result = await FcmToken.destroy({
                where: { id: id }
            });
            return result > 0;
        } catch (error) {
            console.error(error);
        }
        return false;
    }
}
