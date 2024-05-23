import { Request, Response } from "express";
import UserModel from "../model/user-app-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FcmTokenModel from "../model/fcm-token-app-model";

export default class AuthController {

    constructor(
        private readonly userModel: UserModel,
        private readonly fcmTokenModel: FcmTokenModel
    ) { }

    handleRegister = async (req: Request, res: Response) => {
        const { email, password, firstName, lastName, phoneNumber, role, fcmToken } = req.body;

        if (!email || !password) {
            res.status(400).json({ 'message': 'Username and password are required.' });
        }

        if (!firstName || !lastName || !phoneNumber || !role) {
            res.status(400).json({ 'message': 'Missing properties.' });
        }

        const duplicate = await this.userModel.getByParam('email', email)
        if (duplicate) {
            res.status(409).json({ 'message': 'Email already exist.' });
        }

        if (!fcmToken) {
            res.status(400).json({ 'message': 'Missing FCM token.' });
        }

        try {
            const hashedPwd = await bcrypt.hash(password, 10);

            const result = await this.userModel.create({
                email: email,
                password: hashedPwd,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                roleId: role
            })

            if (result) {
                await this.fcmTokenModel.create({
                    token: fcmToken,
                    userEmail: email
                });
                res.status(201).json({ "mensaje": `Usuario ${email} creado con exito` })
            } else {
                res.status(400).json({ "mensaje": "Error en proceso de creación" })
            }
        } catch (err) {
            res.status(500).json({ 'message': "error interno del servidor" });
        }
    }

    handleLogin = async (req: Request, res: Response) => {
        try {
            const { email, password, fcmToken } = req.body;

            if (!email || !password) {
                res.status(400).json({ 'message': 'Username, password and FCM token are required.' });
            }

            const foundUser = await this.userModel.getByParam('email', email)
            if (!foundUser) {
                res.status(401).json({ 'message': 'Unauthorized.' });
            } else {
                const match = await bcrypt.compare(password, foundUser.password);
                if (match) {
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "email": foundUser.email,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET!,
                        { expiresIn: '1h' }
                    );
                    const refreshToken = jwt.sign(
                        {
                            "email": foundUser.email
                        },
                        process.env.REFRESH_TOKEN_SECRET!,
                        { expiresIn: '1d' }
                    );

                    foundUser.refreshToken = refreshToken;
                    const result = await this.userModel.save(foundUser);
                    if (!result) {
                        res.status(400).json({ 'message': 'Refresh token creation failed.' });
                    }

                    const existingFcmToken = await this.fcmTokenModel.getByUserEmail(email);
                    const tokenExists = existingFcmToken && existingFcmToken.some(token => token.token === fcmToken);
                    
                    if (!tokenExists) {
                        await this.fcmTokenModel.create({
                            token: fcmToken,
                            userEmail: email
                        });
                    }

                    res.status(201).json({ "token": accessToken })
                } else {
                    res.status(401).json({ 'message': 'Unauthorized.' });
                }
            }

        } catch (error) {
            res.status(500).json({ 'message': "error interno del servidor" });
        }
    }
}