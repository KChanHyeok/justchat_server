import express from 'express';
import cors from 'cors';
import ApiServer from './server/ApiServer';

const app: any = express();

app.use(cors({ origin: '*'}))

new ApiServer(app)



