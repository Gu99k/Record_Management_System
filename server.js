const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectedDB = require("./DBconnection");
const dotenv = require("dotenv");
const route = require("./routes/userRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// =====================MySQL Database Connection======================

connectedDB();

// ============Routes Connection========================================
app.use("/api", route);

// static files
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
