const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const getDates = 'SELECT * FROM "events";';
  pool
    .query(getDates)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Problem in get dates', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const event = req.body;
  const postDates = `INSERT INTO "events" ("title", "start", "end", "desc", "allDay")
    VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(postDates, [
      event.title,
      event.start,
      event.end,
      event.desc,
      event.allDay,
    ])
    .then((result) => {
      res.sendStatus(201);
      console.log(event, result);
    })
    .catch((err) => {
      console.log('error in post', err);
    });
});

module.exports = router;
