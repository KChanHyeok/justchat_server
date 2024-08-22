import { fileController } from '@/controller/fileController';
import { FileService } from '@/service/fileService';
import { accessAuth } from '@/util/jwt';
import  express from 'express';
import multer from 'multer'; 

const upload = multer()
const file = express.Router();

const files = new fileController(new FileService);

file.post('/upload', upload.single('file'), files.fileUpload)
file.post('/download', accessAuth, files.fileDownload)

export default file;