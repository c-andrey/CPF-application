import { json } from 'body-parser';
import express from 'express';
import http from 'http';
import { AppRouter } from './config/AppRouter';

import './Controllers/CpfController';

import { run } from './config/MongooseConection';
// Constants
const PORT = 8080;
const HOST = 'localhost';

// App
const app = express();

app.use(json());
app.use(AppRouter.getInstance());

// run();

http.createServer(app).listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
