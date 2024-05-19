import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default class AuthMiddleware {

    verifyJWT = (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                res.sendStatus(401);
            }
            console.log(authHeader); // Bearer token

            const token = authHeader!.split(' ')[1];
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!,
            );
            next();
        } catch (error) {
            res.sendStatus(403); // Token Invalido
        }

    }

}