import _ from 'lodash';
import moment from 'moment-timezone';

import app from './app';
import { getDataArtic, getAvailable } from './database/query';

app.listen(3000);
console.log('server on port', 3000);

let lastWednesday = moment().day(3).format("YYYY-MM-DD"); // Establece la fecha actual al miércoles de esta semana

if (moment().day() <= 3) { // Comprueba si ya pasó el miércoles de esta semana
  lastWednesday = moment().day(3).subtract(1, 'week').format("YYYY-MM-DD"); // Si es así, obtiene el miércoles de la semana pasada
};

let fechaSelec= moment().subtract(1, 'day').format('YYYY-MM-DD');
// let fechaSelec= '2023-02-20';

// console.log(fechaSelec);
// console.log(lastWednesday);

let idPlano= 1;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data1', async (req, res) => {
    const data= await generateData1(lastWednesday, idPlano);
    res.json(data);
});

app.get('/data2', async (req, res) => {
    const data= await generateData2(fechaSelec, idPlano);
    res.json(data);
});

app.get('/data3', async (req, res) => {
    const data= await generateData3(lastWednesday, fechaSelec, idPlano);
    res.json(data);
});

app.post('/endpoint', (req, res) => {
    // const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    // fechaRegex.test(req.body.fecha) ?? (fechaSelec= moment(req.body.fecha, "DD/MM/YYYY").format("YYYY-MM-DD"))
    fechaSelec= moment(req.body.fecha, "DD/MM/YYYY").format("YYYY-MM-DD");
    // console.log(fechaSelec);
    idPlano= req.body.plano;
});

app.get('/available', async (req, res) => {
    
    const dis_miercoles= await generateAvailable(lastWednesday);
    const dis_selec= await generateAvailable(fechaSelec);

    const data= {dis_miercoles, dis_selec}

    res.json(data);
});

const generateData1 = async (fecha, idPlano) => {
    try {
        const articObj= await getDataArtic(fecha, idPlano);

        if (articObj.length === 0) {
            return {}
         } else {
             const data= JSON.parse(articObj[0].plano);
             return data;
         };

    } catch (error) {
        console.log(error);
    }
};

const generateData2 = async (fecha, idPlano) => {
    try {
        const articObj= await getDataArtic(fecha, idPlano);

        if (articObj.length === 0) {
           return {}
        } else {
            const data= JSON.parse(articObj[0].plano);
            return data;
        };

    } catch (error) {
        console.log(error);
    }
};

const generateData3 = async (dateLast, dateSelec, idPlano) => {
    try {
        const arrayData1= await generateData1(dateLast, idPlano);
        const arrayData2= await generateData2(dateSelec, idPlano);

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
                difference.push({coord: [element.x, element.y], percent: element.percent});
            } else {
                const dif= element.percent - value.percent;
                difference.push({coord: [element.x, element.y], percent: parseFloat(dif.toFixed(3))});
            }
        });

        _.forEach(data2, element => {
            const value= data1.find(c => c.x == element.x && c.y == element.y);

            if (value === undefined) {
                difference.push({coord: [element.x, element.y], percent: element.percent});
            } else {
                const dif= element.percent - value.percent;
                difference.push({coord: [element.x, element.y], percent: parseFloat(dif.toFixed(3))});
            }
        });

        // console.timeEnd("miPrograma");


        return difference;

    } catch (error) {
        console.log(error);
    }
};

const generateAvailable = async (fecha) => {
    try {
        
        const data= await getAvailable(fecha);

        if (data.length === 0) {
            console.log('No diponible')
        } else {
            const disponibilidad= data[0].disponibilidad/3600;
            const horasProd= data[0].horas_produccion;

            const value= (disponibilidad/horasProd) * 100;

            if (isFinite(value)) return parseFloat(value.toFixed(2));
            
            return 0;
        }
        

    } catch (error) {
        console.log(error);
    }
};


 

