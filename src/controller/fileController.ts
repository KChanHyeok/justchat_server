import { Request, Response } from "express";
import { fileService } from "@service/fileService";

export class fileController {
    constructor(private readonly fileService: fileService){}
    
    fileUpload = async (req: any, res: Response) => {
        try { 
            const result = await this.fileService.FileUpload(req.file)
            return res.send(result)
        }catch(err){
            throw err;
        }
    }
    
     fileDownload = async (req:Request, res:Response) => {
        try {
            const result = await this.fileService.FileDownload(req.body)
            return res.send(result)
        }catch(err){
            throw err
        }
    } 
}