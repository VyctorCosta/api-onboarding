CREATE TABLE "User" (
	"id" uuid NOT NULL,
	"serialId" serial,
	"name" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "PostUser" (
	"userId" uuid NOT NULL,
	"postId" uuid NOT NULL,
	CONSTRAINT "PostUser_pk" PRIMARY KEY ("userId","postId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Posts" (
	"id" uuid NOT NULL,
	"serialId" serial,
	"title" varchar(255) NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"postImage" TEXT NOT NULL,
	"username" varchar(255) NOT NULL,
	"userImage" TEXT NOT NULL,
	"text" TEXT NOT NULL,
	CONSTRAINT "Posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Comments" (
	"id" uuid NOT NULL,
	"serialId" serial,
	"username" varchar(255) NOT NULL ,
	"image" varchar(255) NOT NULL ,
	"userId" uuid NOT NULL ,
	"postId" uuid NOT NULL ,
	"commentary" TEXT NOT NULL,
	CONSTRAINT "Comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Punctuation" (
	"userId" uuid NOT NULL,
	"postId" uuid NOT NULL,
	"serialId" serial,
	"username" varchar(255) NOT NULL,
	"punctuation" smallint NOT NULL,
	CONSTRAINT "Punctuation_pk" PRIMARY KEY ("userId","postId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "PostUser" ADD CONSTRAINT "PostUser_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "PostUser" ADD CONSTRAINT "PostUser_fk1" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE;

ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk0" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE;
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;

ALTER TABLE "Punctuation" ADD CONSTRAINT "Punctuation_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "Punctuation" ADD CONSTRAINT "Punctuation_fk1" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE;
