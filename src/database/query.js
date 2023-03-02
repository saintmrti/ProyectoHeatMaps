import { getConnection } from './connection';

export const getDataArtic = async (fecha, id) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT * FROM Multipak_mapas_calor 
            WHERE fecha= '${fecha}' and idPlano= ${id};
        `); 

        return result.recordset;

    } catch (error) {
        console.log(error);
    }
};

export const getAvailable = async (fecha) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT horas_produccion, disponibilidad FROM Multipack_KPIs_Dia WHERE fecha= '${fecha} 23:59:59';
        `); 

        return result.recordset;

    } catch (error) {
        console.log(error);
    }
};