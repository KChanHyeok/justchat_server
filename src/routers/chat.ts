import { createChatRoom, selectChatRoom, updateChatRoom } from '@/controller/chatRoomController';
import express from 'express';

const chat = express.Router();

chat.post('/insert', createChatRoom)
chat.post('/update', updateChatRoom)
chat.get('/list', selectChatRoom)



export default chat;
