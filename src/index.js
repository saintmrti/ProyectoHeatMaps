import _ from 'lodash';

import app from './app';
import { getDataArtic } from './database/query';

app.listen(3000);
console.log('server on port', 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', async (req, res) => {
    const data= await generateData();
    res.json(data);
});

const generateData = async () => {
    try {
        const arraySkeletons= [];
        const cordinates= [];
        const grouped= {};
        let sumCounts = 0;
        const arrayOverall= await getDataArtic();

        // Creamos listas de puntos en X y en Y
        _.forEach(arrayOverall, ({ skeletons }, key) => {
            const json = JSON.parse(skeletons);
            arraySkeletons.push(json);

            _.forEach(arraySkeletons[key], ({articulaciones, operando}) => {
                if (operando == true) {
                    _.forEach(articulaciones, ({idParteCuerpo, puntoX, puntoZ}, key) => {
                        if ( idParteCuerpo === 16 || idParteCuerpo === 10 || idParteCuerpo === 2 ) {
                            const coord= [parseFloat(puntoX.toFixed(2)), parseFloat((puntoZ/3500).toFixed(2))];
                            cordinates.push(coord);
                        };
                    });
                };
            });
        });

        // Agrupamos por cordenadas
        _.forEach(cordinates, element => {
            const key= element.join(',');
            if(!grouped[key]){
                // grouped[key] = [];
                grouped[key] = 0;
            };
            // grouped[key].push(element);
            grouped[key]++;
        });

        for (const key in grouped) {
            const count = grouped[key];
            sumCounts += count;
        };

        // Construimos la data 
        const data = Object.entries(grouped).map(([key, value]) => ({
            coord: key.split(',').map(Number),
            count: parseFloat(((value / sumCounts) * 100).toFixed(3))
        }));

        return data;

    } catch (error) {
        console.log(error);
    }
};

 

