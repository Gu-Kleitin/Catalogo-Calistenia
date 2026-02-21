import mysql from 'mysql2/promise';

const dbconfig = {
  host:"localhost",
  user:"root",
  password:"",
  database:"CatalogoCalistenia"
};

const pool = mysql.createPool(dbconfig);

export default pool;