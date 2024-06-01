import { Request, Response } from "express";
import { fileService } from "@service/fileService";

export class fileController {
    constructor(private readonly fileService: fileService){}
    
    fileUpload = async (req: any, res: Response) => {
        try { 
            return res.send(await this.fileService.FileUpload(req.file) )
        }catch(err){
            throw err;
        }
    }
    
     fileDownload = async (req:Request, res:Response) => {
        try {
            return res.send(await this.fileService.FileDownload(req.body))
        }catch(err){
            throw err
        }
    } 
}