"use strict";
const {pool} = require ("../connection");
const { categoryData, commentData, reviewData, userData } = require("../data/test-data");

const seed = () => {

    // Inserts Users into the Database
    const insertUsers = () => {
        const query = `INSERT INTO "users" (username, avatar_url, name) VALUES ($1, $2, $3)`;
        // Adds each user to the database
        return Promise.all(userData.map(user => {
            return pool.query(query, [user.username, user.avatar_url, user.name]);
        }));
    };

    // Inserts Categories into the Database
    const insertCategories = () => {
        const query = `INSERT INTO "categories" (slug, description) VALUES ($1, $2)`;
        // Adds each category to the database
        return Promise.all(categoryData.map(category => {
            return pool.query(query, [category.slug, category.description]);
        }));
    };

    // Inserts Reviews into the Database
    const insertReviews = () => {
        const query = `INSERT INTO "reviews" (title, review_body, designer, review_img_url, created_at, votes, category, owner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        // Adds each Review to the Database
        return Promise.all(reviewData.map(review => {
            return pool.query(query, [review.title, review.review_body, review.designer, review.review_img_url, review.created_at, review.votes, review.category, review.owner]);
        }));
    };

    // Inserts Comments into the Database
    const insertComments = () => {
        const query = `INSERT INTO "comments" (author, review_id, votes, created_at, body) VALUES ($1, $2, $3, $4, $5)`;
        // Adds each Comment to the Database
        return Promise.all(commentData.map(comment => {
            return pool.query(query, [comment.author, comment.review_id, comment.votes, comment.created_at, comment.body]);
        }));
    };


    // Create Tables If they don't exist CASCADE will delete all data in the table
    const createTables = () => {
        const query = `            

        DROP TABLE IF EXISTS reviews CASCADE;
        DROP TABLE IF EXISTS comments CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS categories CASCADE;

        CREATE TABLE "users" (
            "username" VARCHAR(255) NOT NULL,
            "avatar_url" text,
            "name" VARCHAR(255) NOT NULL,
            CONSTRAINT "users_pk" PRIMARY KEY ("username")
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE "categories" (
            "slug" VARCHAR(255) NOT NULL,
            "description" text NOT NULL,
            CONSTRAINT "categories_pk" PRIMARY KEY ("slug")
        ) WITH (
          OIDS=FALSE
        );   
        
        CREATE TABLE "comments" (
            "comment_id" serial NOT NULL,
            "author" VARCHAR(255) NOT NULL,
            "review_id" integer,
            "votes" integer NOT NULL DEFAULT '0',
            "created_at" TIMESTAMP NOT NULL,
            "body" VARCHAR(255) NOT NULL,
            CONSTRAINT "comments_pk" PRIMARY KEY ("comment_id")
        ) WITH (
          OIDS=FALSE
        );    
        
        CREATE TABLE "reviews" (
            "review_id" serial NOT NULL,
            "title" VARCHAR(255) NOT NULL,
            "review_body" text NOT NULL,
            "designer" VARCHAR(255),
            "review_img_url" text DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            "created_at" TIMESTAMP NOT NULL,
            "votes" integer NOT NULL DEFAULT '0',
            "category" VARCHAR(255),
            "owner" VARCHAR(255) NOT NULL,
            CONSTRAINT "reviews_pk" PRIMARY KEY ("review_id")
        ) WITH (
          OIDS=FALSE
        );
        
        ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("author") REFERENCES "users"("username");
        ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id");
        
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("category") REFERENCES "categories"("slug");
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("owner") REFERENCES "users"("username");
        `;
        pool.query(query, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Tables created");
            }
        });
    };

    // Create Database
    //createDatabase();

    // Create Tables
    //createTables()


    try {
        insertUsers()
            .then(insertCategories)
            .then(insertReviews)
            .then(insertComments)
            .then(() => {
                console.log("Database seeded");
            }
        );
    } catch (err) {
    console.log(err);
    }
};


    
module.exports = seed;
