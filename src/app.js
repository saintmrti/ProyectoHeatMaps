import express from 'express';
import config from './config';

const app= express();

//settings
app.set('port', config.port);
app.use(express.static('public'));

export default app;