// Users Routes with Error Handling 
const db = require("../db/connection");

// GET /api/users
// Returns all Users
const getUsers = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
}

// GET /api/users
// Returns a single user
const getUser = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [req.params.username]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}


// Export Routes
module.exports = {
    getUsers,
    getUser
}

