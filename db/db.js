const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/products';

const client = new Client({
    connectionString: connectionString
});

client.on('connect', () => {
    console.log('Connected to the database!');
});

/** Create Table **/
const createTable = () => {
    const queryText =
      `DROP TABLE IF EXISTS products;
        CREATE TABLE IF NOT EXISTS
        products (
          id PRIMARY KEY,
          fullprice NUMERIC,
          description TEXT,
          saleprice NUMERIC,
          discount NUMERIC
        )`;
  
    client.query(queryText)
      .then((res) => {
        console.log(res);
        client.end();
      })
      .catch((err) => {
        console.log(err);
        client.end();
      });
};

// get specific product and its descriptions
const getOne = (productID, callback) => {
    console.log("This is the current ID: " + productID)
    client.query(`SELECT fullprice, description, saleprice, discount FROM products WHERE id = ${productID}`, (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            console.log(`Succesfully retrieved PostGres record: ${res}`)
            callback(null, res);
        };
        client.end();
    });
};
  
module.exports = { createTable, getOne }