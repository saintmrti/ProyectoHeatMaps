import _ from 'lodash';

import { generateWednesday } from './generateWednesday';
import { generateFriday } from './generateFriday';

export const generateDiff = async () => {
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
            difference.push({coord: [element.x, element.y], count: element.percent});
        } else {
            const dif= element.percent - value.percent;
            difference.push({coord: [element.x, element.y], count: parseFloat(dif.toFixed(3))});
        }
    });

    // console.timeEnd("miPrograma");

    return difference;
};