const fs = require('fs');
const faker = require('faker');
const Chance = require('chance');
let intialized = false;

// input name of file name where you are writing the products/reviews to below
const writeUsers = fs.createWriteStream('./products.csv');
writeUsers.write('_id,Prices,Descriptions,Mockprice,Discount\n', 'utf8');

// ID,Prices,Descriptions,Mockprice,Discount
const writeTenMillionProducts = (writer, encoding, callback) => {
    // create ten million products
    let i = 10000000;
    let _id = 0; 
    let chance = new Chance();
 
    function write() {
        let ok = true;
        do {
            if (i % 1000000 === 0) {
                let status = (i / 10000000) * 100;
                console.log(`${status}% remaining...`);
            };

            i -= 1;
            _id += 1;
            const marketPrice = chance.floating({ min: 0, max: 200, fixed: 2 });
            const discount = (chance.natural({ min: 0, max: 20})/100);
            const discountedPrice = marketPrice - (marketPrice * discount); 
            const productDescription = faker.lorem.sentences();
            const data = `${_id},${marketPrice},${productDescription},${discountedPrice},${discount}\n`;
            if (i === 0) {
                writer.write(data, encoding, callback);
            } else {
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        
        if (i > 0) {
            writer.once('drain', write)
        }
    }

    write();   
};

const createCSV = () => {
    fs.readFile('./products.csv', 'utf8', function (err, data) {
        if (err) {
            throw err;
        } else {
            let dataArray = data.split(/\r?\n/);
            // if the current blank CSV's length is only equal to the length of the column header array, write 
            if (dataArray.length < 3) {
                if (!intialized) {
                    console.log("Generating data...");
                    writeTenMillionProducts(writeUsers, 'utf-8', () => {
                        console.log("Complete - CSV generated!");
                        writeUsers.end();
                        intialized = true;
                    });
                };
            };
        };
    });
};

module.exports = { createCSV }