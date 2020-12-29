const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
  let getDates = 'SELECT * FROM "dates";';
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
