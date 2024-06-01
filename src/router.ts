import express from 'express';
import { register, login } from '@controller/memberController';
import { createChatRoom, selectCharRoom } from '@controller/chatRoomController';
import { fileController } from '@controller/fileController';
import multer from 'multer'; 
import { fileService } from '@service/fileService';

const upload = multer()

const router = express.Router();

const controller = new fileController(new fileService);

router.get('/chat/list', selectCharRoom)
router.post('/file/upload', upload.single('file'), controller.fileUpload)
router.post('/file/download', controller.fileDownload)
router.post('/chat/insert', createChatRoom)
router.post('/register', register)
router.post('/login', login)

export default router;