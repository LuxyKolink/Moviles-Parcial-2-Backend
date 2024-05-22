import { Request, Response } from "express";
import UserModel from "../model/user-app-model";

export default class UserController {

    constructor(
        private readonly userModel: UserModel
    ){}

    getUserById = async (req: Request, res: Response) => {
        try {
            const id = Number(req?.params?.id)
            if (!id) {
                res.status(400).json({ "message": 'ID usuario requerido.' });
            } else {
                const user = await this.userModel.getById(id)
                if (user) {
                    res.status(200).json({ "data": user })
                } else {
                    res.status(204).json({ "message": `No hay registro de usuario con ID=${id}` })
                }
            }
        } catch (error) {
            res.status(500).json({ "message": "Error interno del servidor" })
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const users = await this.userModel.getAll(page)
            res.status(200).json({ data: users })
        } catch (error) {
            console.error(error);
            res.status(500).json({ 'message': 'Error interno del servidor' })
        }
    }

}