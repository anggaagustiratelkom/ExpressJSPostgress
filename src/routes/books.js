const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const client = require("../connection/connection");

router.use(bodyParser.json());

router.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});

router.get("/books", (req, res) => {
  client.query(`SELECT * FROM books`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

router.post("/books", (req, res) => {
  const {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;
  let finished = 0;
  if (readPage == pageCount) {
    finished = 1;
  }
  client.query(
    `INSERT INTO
    books(id, name, year, author, summary, publisher, pageCount, readPage, finished, reading)
    VALUES('${id}','${name}','${year}','${author}','${summary}','${publisher}','${pageCount}','${readPage}','${finished}','${reading}')`,
    (err) => {
      if (readPage <= 0) {
        // res.sendStatus(500);
        res.status(401).json({ error: "Unauthorized" });
      } else if (readPage > pageCount) {
        res.sendStatus(400);
      } else {
        if (!err) {
          res.send("Insert Books Succes");
        } else {
          res.send(err.message);
        }
      }
    }
  );
});

router.put("/books/:id", (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  client.query(
    `UPDATE books
    SET name = '${name}', year = '${year}', author = '${author}', summary = '${summary}', publisher = '${publisher}', pagecount = '${pageCount}', readpage = '${readPage}', reading = '${reading}'
    WHERE id = '${req.params.id}'`,
    (err) => {
      if (!err) {
        res.send("Update Books Succes");
      } else {
        res.send(err.message);
      }
    }
  );
});

router.delete("/books/:id", (req, res) => {
  client.query(`DELETE FROM books WHERE id = '${req.params.id}'`, (err) => {
    if (!err) {
      res.send("Delete Books Succes");
    } else {
      res.send(err.message);
    }
  });
});

module.exports = router;
