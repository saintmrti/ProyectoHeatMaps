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
    const dataArray= await generateWednesday();
    const data=[];

    _.map(dataArray, ({x, y, percent}) => {
        data.push({coord: [x, y], count: percent});
    });

    res.json(data);
});

app.get('/viernes', async (req, res) => {
    const dataArray= await generateFriday();
    const data=[];

    _.map(dataArray, ({x, y, percent}) => {
        data.push({coord: [x, y], count: percent});
    });

    res.json(data);
});

app.get('/diferencia', async (req, res) => {
    const diff= await generateDiff();
    res.json(diff);
});

 

