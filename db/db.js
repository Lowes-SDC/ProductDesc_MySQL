const mysql = require('mysql');
const dbKey = require('./dbkey');
var connection = mysql.createConnection({
    host     : dbKey.HOST,
    user     : dbKey.USER,
    password : dbKey.PASSWORD,
    database : dbKey.DB
});

// generate 10M record CSV file
// fakerDataGenerator.createCSV();

connection.connect(()=> {console.log("connected to database");});

// get specific product and its descriptions
const getOne = (productID, callback) => {
    console.log("This is the current ID: " + productID)
    
};
  
module.exports = { getOne }