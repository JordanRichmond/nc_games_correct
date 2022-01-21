// Comments Routes with Error Handling
const db = require("../db/connection");

// DELETE /api/comments/:comment_id
// Deletes a Comment
const deleteComment = async (req, res, next) => {
    try {
        const result = await db.query('DELETE FROM comments WHERE comment_id = $1', [req.params.comment_id]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// PATH /api/comments/:comment_id
// Updates a Comment
const updateComment = async (req, res, next) => {
    try {
        const result = await db.query('UPDATE comments SET comment = $1 WHERE comment_id = $2', [req.body.comment, req.params.comment_id]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

// Export Routes
module.exports = {
    deleteComment,
    updateComment
}