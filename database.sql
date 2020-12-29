CREATE TABLE "dates" (
"id" SERIAL PRIMARY KEY,
"event" VARCHAR NOT NULL,
"sdate" DATE NOT NULL,
"edate" DATE NOT NULL,
"repeat" BOOLEAN
);
