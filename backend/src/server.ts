import { json } from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import './Controllers/CpfController';
import dotenv from 'dotenv';
dotenv.config();

import { run } from './config/MongooseConection';
import router from './router';
// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// App
const app = express();

app.use(json());
app.use(cors());
app.use(router);

run();

http.createServer(app).listen(parseInt(PORT), HOST, 511, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
