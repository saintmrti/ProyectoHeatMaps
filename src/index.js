import _ from 'lodash';

import app from './app';
import { generateWednesday } from './controller/generateWednesday';
import { generateFriday } from './controller/generateFriday';

app.listen(3000);
console.log('server on port', 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', async (req, res) => {
    const dataWed= await generateWednesday();
    const dataFri= await generateFriday();
    let difference= [];

    // console.time("miPrograma");

    _.forEach(dataWed, element => {
        const value= dataFri.find(c => c.x == element.x && c.y == element.y);

        if (value === undefined) {
            difference.push({coord: [element.x, element.y], count: element.percent});
        } else {
            const dif= element.percent - value.percent;
            difference.push({coord: [element.x, element.y], count: parseFloat(dif.toFixed(3))});
        }
    });

    _.forEach(dataFri, element => {
        const value= dataWed.find(c => c.x == element.x && c.y == element.y);

        if (value === undefined) {
            difference.push(element);
        } else {
            const dif= element.percent - value.percent;
            difference.push({coord: [element.x, element.y], count: parseFloat(dif.toFixed(3))});
        }
    });

    // console.timeEnd("miPrograma");

    res.json(difference);
});

 

