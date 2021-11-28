CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"img_url" TEXT,
	"user_type_id" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "doctors_profiles" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"speciality_id" integer NOT NULL,
	"doctor_code" varchar(255),
	CONSTRAINT "doctors_profiles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_type" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "user_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "specialities" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "specialities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reviews" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"comment" integer,
	"rating" integer,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id");

ALTER TABLE "doctors_profiles" ADD CONSTRAINT "doctors_profiles_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "doctors_profiles" ADD CONSTRAINT "doctors_profiles_fk1" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id");

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

INSERT INTO user_type (name) VALUES ('trans'), ('professional');





