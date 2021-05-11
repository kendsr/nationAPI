const dotenv = require('dotenv').config();
if (dotenv.error) {
    console.log(dotenv.parsed)
    throw dotenv.error;
}
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     port: process.env.DB_PORT,
     user: process.env.DB_USER, 
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE_NAME,
     connectionLimit: process.env.DB_CONNECT_LIMIT
});

pool.getConnection()
.then(conn => {
    conn.query("SELECT * from countries")
      .then(rows => {
        //console.log(rows);
        rows.forEach(row => {
          let d = new Date(row.national_day);
          let month = d.getMonth() + 1;
          let day = d.getDate();
          let year = d.getFullYear();
          let date = month + "/" + day + "/" + year;
          console.log('Name: ' + row.name + '\n' +'Holiday: '+ date);
        });
      })
      .then(res => { 
        conn.release(); // release to pool
      })
    });