import express from 'express';
import { auth } from './routes';

const app = express();

app.listen(2000, () => {
    console.log('Server is running on port 3000');
});