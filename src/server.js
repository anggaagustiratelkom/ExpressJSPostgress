const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const Error = require("./error");

const client = require("./connection");
const e = require("express");
const app = express();
app.use(bodyParser.json());
const port = process.env.api_PORT;

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

client.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected Database");
  }
});

app.get("/books", (req, res) => {
  client.query(`SELECT * FROM books`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

app.post("/books", (req, res) => {
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

  client.query(
    `INSERT INTO 
    books(id, name, year, author, summary, publisher, pageCount, readPage, finished, reading) 
    VALUES('${id}','${name}','${year}','${author}','${summary}','${publisher}','${pageCount}','${readPage}','${finished}','${reading}')`,
    (err) => {
      if (readPage <= 0) {
        res.sendStatus(500);
        // res.status(401).json({ error: 'Unauthorized' });
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

app.put("/books/:id", (req, res) => {
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

app.delete("/books/:id", (req, res) => {
  client.query(`DELETE FROM books WHERE id = '${req.params.id}'`, (err) => {
    if (!err) {
      res.send("Delete Books Succes");
    } else {
      res.send(err.message);
    }
  });
});
