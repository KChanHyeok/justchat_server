import express from 'express';
import { register, login } from '../src/controller/memberController';
import { createChatRoom, selectCharRoom } from '../src/controller/chatRoomController';

const router = express.Router();


router.get('/chat/list', selectCharRoom)
router.post('/chat/create', createChatRoom)
router.post('/register', register)
router.post('/login', login)

export default router;