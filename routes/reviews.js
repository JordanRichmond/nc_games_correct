const db = require("../db/connection");

// GET /api/reviews/:review_id
// Returns a single review
const getReview = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM reviews WHERE review_id = $1', [req.params.review_id]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// PATCH /api/reviews/:review_id
// Updates a review
const updateReview = async (req, res, next) => {
    try {
        const result = await db.query('UPDATE reviews SET title = $1, content = $2 WHERE review_id = $3', [req.body.title, req.body.content, req.params.review_id]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// GET /api/reviews
// Returns all reviews
const getReviews = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM reviews');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// GET /api/reviews/:review_id/comments
// Returns all comments for a review
const getReviewComments = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM comments WHERE review_id = $1', [req.params.review_id]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// POST /api/reviews/:review_id/comments
// Creates a comment for a review
const createReviewComment = async (req, res, next) => {
    try {
        const result = await db.query('INSERT INTO comments (review_id, comment) VALUES ($1, $2) RETURNING *', [req.params.review_id, req.body.comment]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// Export Routes
module.exports = {
    getReview,
    updateReview,
    getReviews,
    getReviewComments,
    createReviewComment
}