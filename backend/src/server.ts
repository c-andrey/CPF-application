import { json } from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import './Controllers/CpfController';

import { run } from './config/MongooseConection';
import { cpfRouter } from './router';
// Constants
const PORT = 8080;
const HOST = 'localhost';

// App
const app = express();

app.use(json());
app.use(cors());
app.use(cpfRouter);

run();

http.createServer(app).listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
