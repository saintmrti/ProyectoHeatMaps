import _ from 'lodash';
import app from './app';

import { generateWednesday } from './controller/generateWednesday';
import { generateFriday } from './controller/generateFriday';
import { generateDiff } from './controller/generateDiff';

app.listen(3000);
console.log('server on port', 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/miercoles', async (req, res) => {
    const dataWed= await generateWednesday();
    res.json(dataWed);
});

app.get('/viernes', async (req, res) => {
    const dataFri= await generateFriday();
    res.json(dataFri);
});

app.get('/diferencia', async (req, res) => {
    const diff= await generateDiff();
    res.json(diff);
});

 

