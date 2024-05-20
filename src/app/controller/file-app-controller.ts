import { Request, Response } from "express";
import path from "path";
import { UploadedFile, FileArray } from "express-fileupload";

export default class FileController {

    constructor(){

    }

    uploadFile = async (req: Request, res: Response) => {
        const files = req.files
        console.log(files)

        const uploadedFiles = files as FileArray;

        Object.keys(uploadedFiles).forEach(key => {
            const file = uploadedFiles[key] as UploadedFile;
            const filepath = path.join(__dirname, '..', '..', '..', 'img', file.name);
            file.mv(filepath, (err) => {
                if (err) {
                  res.status(500).json({ status: 'error', message: err });
                }
              });
        });

        res.json({ status: 'success', message: Object.keys(uploadedFiles).toString() })
    }  

}