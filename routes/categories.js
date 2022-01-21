// Categories Routes with Error Handling
const db = require("../db/connection");

// GET /api/categories
// Returns all categories
const getCategories = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// Export Routes
module.exports = {
    getCategories
}