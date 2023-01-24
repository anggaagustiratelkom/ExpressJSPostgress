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
  client.query(`SELECT * FROM employees ORDER BY id_employee`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

router.post("/", (req, res) => {
  const { id_employee, name, email, password } = req.body;
  client.query(
    `INSERT INTO employees
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

router.put("/:id", (req, res) => {
  const { id_employee, name, email, password } = req.body;
  client.query(
    `UPDATE employees
  SET name = '${name}', email = '${email}', password' = ${password}' 
  WHERE id_employee = '${req.params.id_employee}'`,
    (err) => {
      if (!err) {
        res.send("Update Employee Succes");
      } else {
        res.send(err.message);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  client.query(
    `DELETE FROM employee WHERE id_employee = '${req.params.id_employee}'`,
    (err) => {
      if (!err) {
        res.send("Delete Employee Succes");
      } else {
        res.send(err.message);
      }
    }
  );
});

module.exports = router;
