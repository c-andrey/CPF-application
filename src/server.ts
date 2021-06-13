'use strict';
import { json } from 'body-parser';
import { cpfRouter } from './router';
import express from 'express';

import { run } from './config/MongooseConection';
// Constants
const PORT = 8080;
const HOST = 'localhost';

// App
const app = express();
app.use(json());
app.use(cpfRouter);

run();
app.get('/', (req, res) => {
    res.send('Hello World !!');
});

app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
