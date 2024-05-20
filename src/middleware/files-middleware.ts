import { NextFunction, Request, Response } from "express";

export default class FilesMiddleware {

    filesPayloadExist = (req: Request, res: Response, next: NextFunction) => {
        if (!req.files) {
            res.status(400).json({ status: "error", message: "Missing files" })
        }
        next()
    }

}