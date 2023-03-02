import express from 'express';
import bodyParser from 'body-parser';
import config from './config';

const app= express();

//settings
app.set('port', config.port);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

export default app;