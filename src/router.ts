import express from 'express';
import { register, login } from '@controller/memberController';
import { createChatRoom, selectCharRoom } from '@controller/chatRoomController';

const router = express.Router();


router.get('/chat/list', selectCharRoom)
router.post('/chat/insert', createChatRoom)
router.post('/register', register)
router.post('/login', login)

export default router;