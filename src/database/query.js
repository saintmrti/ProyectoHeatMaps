import { getConnection } from './connection';

export const getWednesday = async (res, req) => {
    try {
        const pool = await getConnection();
        const result1 = await pool.request().query(`
            SELECT * FROM Nuitrack_Frames 
            WHERE fecha  >= '2023-02-08 09:00:00' AND fecha <='2023-02-08 10:00:00'
        `);
        // const result2 = await pool.request().query(`
        //     SELECT * FROM Nuitrack_Frames 
        //     WHERE fecha  >= '2023-02-03 06:01:00' AND fecha <='2023-02-03 12:00:00'
        // `);
        // const result3 = await pool.request().query(`
        //     SELECT * FROM Nuitrack_Frames 
        //     WHERE fecha  >= '2023-02-03 12:01:00' AND fecha <='2023-02-03 18:00:00'
        // `);
        // const result4 = await pool.request().query(`
        //     SELECT * FROM Nuitrack_Frames 
        //     WHERE fecha  >= '2023-02-03 18:01:00' AND fecha <='2023-02-03 23:59:00'
        // `);

        // const data= [...result1.recordset, ...result2.recordset, ...result3.recordset, ...result4.recordset];

        return result1.recordset;

    } catch (error) {
        console.log(error);
    }
};

export const getFriday = async (res, req) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT * FROM Nuitrack_Frames 
            WHERE fecha  >= '2023-02-10 09:00:00' AND fecha <='2023-02-10 10:00:00'
        `);

        return result.recordset;

    } catch (error) {
        console.log(error);
    }
};