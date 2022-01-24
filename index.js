const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app =  express();
const cors = require('cors');

const routes = require('./routes/index');
const userData = require('./routes/users');
const reviewData = require('./routes/reviews');
const commentData = require('./routes/comments');
const categoryData = require('./routes/categories');


app.set('port', process.env.PORT || 8080);

app.use(express.json())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
// Reviews
app.get("/api", routes.index)
app.get("/api/reviews/:review_id", reviewData.getReview)
app.patch("/api/reviews", reviewData.updateReview)
app.get("/api/reviews", reviewData.getReviews)
app.get("/api/reviews/:review_id/comments", reviewData.getReviewComments)
app.post("/api/reviews/:review_id/comments", reviewData.createReviewComment)

// Comments
app.delete("/api/comments/:comment_id", commentData.deleteComment)
app.patch("/api/comments/:comment_id", commentData.updateComment)

// Users
app.get("/api/users/:username", userData.getUser)
app.get("api/users", userData.getUsers)

// Categories
app.get("/api/categories/", categoryData.getCategories)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running successfully on Port ${PORT}...`);
});