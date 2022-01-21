const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.PGDATABASE,
});

// Try to Connect to the Database / Throws an Error
pool.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected to the Database...');
    }
});

// Exports Database
module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};