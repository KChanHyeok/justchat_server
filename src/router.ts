import express from 'express';
import multer from 'multer'; 
import { register, login, memberList } from '@controller/memberController';
import { createChatRoom, selectCharRoom } from '@controller/chatRoomController';
import { fileController } from '@controller/fileController';
import { fileService } from '@service/fileService';

const upload = multer()

const router = express.Router();

const controller = new fileController(new fileService);

router.get('/chat/list', selectCharRoom)
router.get('/member/list', memberList)
router.post('/file/upload', upload.single('file'), controller.fileUpload)
router.post('/file/download', controller.fileDownload)
router.post('/chat/insert', createChatRoom)
router.post('/register', register)
router.post('/login', login)

export default router;