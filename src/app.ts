import  express from 'express';
import cors from 'cors';
import http from 'http';
import { run } from '@util/db';
import ApiServer from '@server/ApiServer';
import SocketServer from '@server/SocketServer';

const app: any = express();
app.use(cors({ origin: '*'}))
const server = http.createServer(app);


new ApiServer(app);
const socket = new SocketServer(server)
socket.start();
server.listen(3380,()=> {
    console.log('Server is running on port 80')
})

 run()



