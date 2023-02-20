import { getConnection } from './connection';

export const getDataArtic = async (res, req) => {
    try {
        const pool = await getConnection();
        const result1 = await pool.request().query(`
            SELECT * FROM Nuitrack_Frames 
            WHERE fecha  >= '2023-02-08 00:01:00' AND fecha <='2023-02-08 06:00:00'
        `);
        const result2 = await pool.request().query(`
            SELECT * FROM Nuitrack_Frames 
            WHERE fecha  >= '2023-02-08 06:01:00' AND fecha <='2023-02-08 12:00:00'
        `);
        const result3 = await pool.request().query(`
            SELECT * FROM Nuitrack_Frames 
            WHERE fecha  >= '2023-02-08 12:01:00' AND fecha <='2023-02-08 18:00:00'
        `);
        const result4 = await pool.request().query(`
            SELECT * FROM Nuitrack_Frames 
            WHERE fecha  >= '2023-02-08 18:01:00' AND fecha <='2023-02-08 23:59:00'
        `);

        const data= [...result1.recordset, ...result2.recordset, ...result3.recordset, ...result4.recordset];

        return data;

    } catch (error) {
        console.log(error);
    }
};