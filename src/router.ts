import express from 'express';
import multer from 'multer'; 
import { register, login, memberList, memberUpdate, memberDelete } from '@controller/memberController';
import { createChatRoom, selectChatRoom, updateChatRoom } from '@controller/chatRoomController';
import { fileController } from '@controller/fileController';
import { fileService } from '@service/fileService';

const upload = multer()

const router = express.Router();

const files = new fileController(new fileService);

router.get('/chat/list', selectChatRoom)
router.get('/member/list', memberList)
router.post('/member/update', memberUpdate)
router.post('/member/delete', memberDelete)
router.post('/file/upload', upload.single('file'), files.fileUpload)
router.post('/file/download', files.fileDownload)
router.post('/chat/insert', createChatRoom)
router.post('/chat/update', updateChatRoom)
router.post('/register', register)
router.post('/login', login)

export default router;