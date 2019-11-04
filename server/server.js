const express = require("express");
const app = express();
const port = 3332;
const path = require('path');
const db = require('../db/db');
const cors = require("cors");

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/desc', (req, res) => {
    let productID = req.query.id;
    console.log("Initiating server query to database with productID: " + productID);
    console.time(); 

    
});

app.listen(port, () => {console.log(`server is running on port ${port}`);});