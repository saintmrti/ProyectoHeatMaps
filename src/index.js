import _ from 'lodash';

import app from './app';
import { getDataArtic } from './database/query';

app.listen(3000);
console.log('server on port', 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data1', async (req, res) => {
    const data= await generateData1();
    res.json(data);
});

app.get('/data2', async (req, res) => {
    const data= await generateData2();
    res.json(data);
});

app.get('/data3', async (req, res) => {
    const data= await generateData3();
    res.json(data);
});

const generateData1 = async () => {
    try {
        const fecha= '2023-02-20';
        const idPlano= 1;

        const articObj= await getDataArtic(fecha, idPlano);

        const data= JSON.parse(articObj[0].plano);

        return data;

    } catch (error) {
        console.log(error);
    }
};

const generateData2 = async () => {
    try {
        const fecha= '2023-02-21';
        const idPlano= 1;

        const articObj= await getDataArtic(fecha, idPlano);

        const data= JSON.parse(articObj[0].plano);

        return data;

    } catch (error) {
        console.log(error);
    }
};

const generateData3 = async () => {
    try {
        const arrayData1= await generateData1();
        const arrayData2= await generateData2();

        const data1=[];
        const data2=[];
        const difference= [];

        _.map(arrayData1, ({ coord, percent }) => {
            data1.push({x: coord[0], y: coord[1], percent})
        });

        _.map(arrayData2, ({ coord, percent }) => {
            data2.push({x: coord[0], y: coord[1], percent})
        });

        // console.time("miPrograma");

        _.forEach(data1, element => {
            const value= data2.find(c => c.x == element.x && c.y == element.y);

            if (value === undefined) {
                difference.push({coord: [element.x, element.y], count: element.percent});
            } else {
                const dif= element.percent - value.percent;
                difference.push({coord: [element.x, element.y], count: parseFloat(dif.toFixed(3))});
            }
        });

        _.forEach(data2, element => {
            const value= data1.find(c => c.x == element.x && c.y == element.y);

            if (value === undefined) {
                difference.push({coord: [element.x, element.y], count: element.percent});
            } else {
                const dif= element.percent - value.percent;
                difference.push({coord: [element.x, element.y], count: parseFloat(dif.toFixed(3))});
            }
        });

        // console.timeEnd("miPrograma");


        return difference;

    } catch (error) {
        console.log(error);
    }
};


 

