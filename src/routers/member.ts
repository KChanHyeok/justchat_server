import { login, register } from '@/controller/authController';
import { memberDelete, memberList, memberUpdate } from '@/controller/memberController';
import express from 'express';

const member = express.Router();

member.get('/list', memberList )
member.post('/update', memberUpdate)
member.post('/delete', memberDelete)

export default member;
