import sql from 'mssql';

const dbSettings = {
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
    server: process.env.SERVER,
    requestTimeout: 300000
    // options: {
    //     encrypt: true,
    // },
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
};