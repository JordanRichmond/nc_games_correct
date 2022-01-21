DROP DATABASE IF EXISTS nc_games_test;
DROP DATABASE IF EXISTS nc_games;

CREATE DATABASE nc_games_test;
CREATE DATABASE nc_games;


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