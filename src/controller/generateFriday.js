import _ from 'lodash';
import { getFriday } from '../database/query';

export const generateFriday = async () => {
    try {
        let arraySkeletons= [];
        let dataArray= [];
        let cordinates= [];
        let grouped= {};
        let sumCounts = 0;

        const arrayOverall= await getFriday();

        // Creamos listas de puntos en X y en Y
        _.forEach(arrayOverall, ({ skeletons }, key) => {
            const json = JSON.parse(skeletons);
            arraySkeletons.push(json);

            _.forEach(arraySkeletons[key], ({articulaciones, operando}) => {
                if (operando == true) {
                    _.forEach(articulaciones, ({idParteCuerpo, puntoX, puntoY}, key) => {
                        if ( idParteCuerpo === 16 || idParteCuerpo === 10 || idParteCuerpo === 2 ) {
                            const coord= [parseFloat(puntoX.toFixed(2)), parseFloat((puntoY).toFixed(2))];
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
            }
            // grouped[key].push(element);
            grouped[key]++;
        });

        for (const key in grouped) {
            const count = grouped[key];
            sumCounts += count;
        };

        for (const key in grouped) {
            const [x, y]= key.split(",");
            const count= grouped[key];
            const percent= parseFloat(((count / sumCounts) * 100).toFixed(3));
            dataArray.push({x: Number(x), y: Number(y), percent});
        };

        return dataArray;

    } catch (error) {
        console.log(error);
    }
};