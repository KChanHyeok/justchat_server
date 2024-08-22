import { login, register } from '@/controller/authController';
import express from 'express';

const auth = express.Router();

auth.post('/login', login)
auth.post('/register', register)




export default auth;