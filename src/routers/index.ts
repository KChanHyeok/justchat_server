import express from 'express';
import auth from './auth';
import chat from './chat';
import member from './member';
import file from './file';
import { accessAuth } from '@/util/jwt';

const routers = express.Router();

routers.use('/auth', auth)
routers.use('/chat', accessAuth, chat)
routers.use('/member',accessAuth, member)
routers.use('/file', file)

export default routers;