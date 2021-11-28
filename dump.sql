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
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"speciality_id" integer NOT NULL,
	"subtitle" varchar(255),
	"doctor_code" varchar(255),
	"subtitle" varchar(255),
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
	"text" integer,
	"rating" integer,
	"doctors_profile_id" integer NOT NULL,
	"timestamp" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id");


CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cities" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "cities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


INSERT INTO user_type (name) VALUES ('trans'), ('professional');


CREATE TABLE "states" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id");

ALTER TABLE "doctors_profiles" ADD CONSTRAINT "doctors_profiles_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "doctors_profiles" ADD CONSTRAINT "doctors_profiles_fk1" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id");
ALTER TABLE "doctors_profiles" ADD CONSTRAINT "doctors_profiles_fk2" FOREIGN KEY ("city_id") REFERENCES "cities"("id");
ALTER TABLE "doctors_profiles" ADD CONSTRAINT "doctors_profiles_fk3" FOREIGN KEY ("state_id") REFERENCES "states"("id");



ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("doctors_profile_id") REFERENCES "doctors_profiles"("id");
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");