const seed = require('./seed');
const db = require('../connection.js');

// Runs the seed function
try {
    seed();
} catch (err) {
    console.log(err);
}
