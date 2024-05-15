import express from 'express';
import { register } from './controller/memberController';

const router = express.Router();

router.post('/register', register)

export default router;