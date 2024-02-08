const {
  create,
  getAll,
  getSingleUsers,
  deleteUser,
  updateUser,
} = require("../controller/userController");

const express = require("express");

const route = express.Router();
route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getSingleUsers);
route.delete("/delete/:id", deleteUser);
route.put("/update/:id", updateUser);

module.exports = route;
