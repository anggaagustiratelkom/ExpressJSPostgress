const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const client = require("../connection/connection");

router.use(bodyParser.json());

router.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});

router.get("/", (req, res) => {
  client.query(`SELECT * FROM employee ORDER BY id_employee`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

router.post("/", (req, res) => {
  const { id_employee, name, email, password } = req.body;
  client.query(
    `INSERT INTO employee
  (id_employee, name, email, password) VALUES
  ('${id_employee}', '${name}', '${email}', '${password}')`,
    (err) => {
      if (id_employee < 1) {
        res.status(402).json({ error: "id employee must greater then 0" });
      } else {
        res.send("Insert employee Succes");
      }
    }
  );
});

module.exports = router;
