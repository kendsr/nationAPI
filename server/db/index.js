const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     port: process.env.DB_PORT,
     user:process.env.DB_USER, 
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE_NAME,
     connectionLimit: process.env.DB_CONNECT_LIMIT
});
let countriesDB = {};
countriesDB.all = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("select * from countries");
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

countriesDB.one = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query("select * from countries where country_id = ?",[id]);
        return row;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}
    
module.exports = countriesDB;