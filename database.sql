CREATE TABLE "events" (
"id" SERIAL PRIMARY KEY,
"title" VARCHAR NOT NULL,
"start" DATE NOT NULL,
"end" DATE NOT NULL,
"desc" VARCHAR,
"allDay" BOOLEAN
);

INSERT INTO "events" ("title" , "start" , "end" , "desc", "allDay")
VALUES ('Nuclear Physics', '1-14-2021' , '1-20-2021', 'Studying the Magic of Big Booms', 'false');