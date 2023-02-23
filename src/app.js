import express from 'express';
import config from './config';

const app= express();

//settings
app.set('port', config.port);
app.use(express.static(__dirname + '/public'));

export default app;