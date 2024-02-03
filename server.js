const con = require("./DBconnection");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// =====================MySQL Database Connection======================

con.connect((error) => {
  if (error) {
    return error;
  }
  // ====================Get All Record API=============================
  app.get("/api/get", (req, resp) => {
    const sqlGet = "SELECT * FROM cruddata";
    con.query(sqlGet, (err, data) => {
      if (err) {
        return resp.json(err);
      } else {
        resp.send(data);
      }
    });
  });
  // ================== Delete API=================================

  app.delete("/api/delete/:id", (req, resp) => {
    const id = req.params.id;
    const sqlDel = "DELETE FROM cruddata WHERE id=";
    con.query(sqlDel + id, (err, data) => {
      if (err) {
        resp.json(err);
      } else {
        resp.send(data);
      }
    });
  });

  // ========================Post-Api================================
  app.post("/api/create", (req, resp) => {
    let name = req.body.name;
    let email = req.body.email;
    let contacts = req.body.contacts;

    const sqlCreate =
      "INSERT INTO cruddata(name, email, contacts) VALUES (?, ?, ? )";

    con.query(sqlCreate, [name, email, contacts], (err, data) => {
      if (err) {
        return resp.json(err);
      } else {
        resp.send(data);
      }
      return;
    });
  });

  // ============Get-Data-By-Id API========================================

  app.get("/api/get/:id", (req, resp) => {
    const sqlGet = "SELECT * FROM cruddata WHERE id=";
    const id = req.params.id;

    con.query(sqlGet + id, (err, data) => {
      if (err) {
        return resp.json(err);
      } else {
        resp.send(data);
      }
      return;
    });
  });

  // =======Update API===========================================
  app.put("/api/update/:id", (req, resp) => {
    const { name, email, contacts } = req.body;
    const sqlUpd =
      "UPDATE cruddata SET name = ?, email = ?, contacts = ? WHERE id = ?";
    const id = req.params.id;

    con.query(sqlUpd, [name, email, contacts, id], (err, data) => {
      if (err) {
        return resp.json(err);
      } else {
        resp.send(data);
      }
      return;
    });
  });
});
// static files
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

//port
const port = process.env.PORT || 5000;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
