import _ from 'lodash';
import { getWednesday } from '../database/query';

export const generateWednesday = async () => {
    try {
        let arraySkeletons= [];
        let dataArray= [];
        let cordinates= [];
        let groups = {};
        let grouped= {};
        let sumCounts = 0;

        const arrayOverall= await getWednesday();

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


        // // Recorremos cada coordenada
        // for (let i = 0; i < dataArray.length; i++) {
        //     let coord = dataArray[i];
        //     let x = coord[0];
        //     let y = coord[1];
            
        //     // Verificamos si la clave Y ya existe en el objeto
        //     if (y in groups) {
        //         groups[y].push(x);
        //     } else {
        //         groups[y] = [x];
        //     }
        // };

        // // Ordenamos cada lista de coordenadas de menor a mayor según su valor de X
        // for (let y in groups) {
        //     groups[y].sort((a, b) => a - b);
        // };


        // Construimos la data 
        // const data = Object.entries(grouped).map(([key, value]) => ({
        //     coord: key.split(',').map(Number),
        //     count: value
        // }));

        return dataArray;

    } catch (error) {
        console.log(error);
    }
};