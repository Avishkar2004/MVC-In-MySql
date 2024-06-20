const express = require("express");
const createDBConnection = require("./connection");
require("dotenv").config();
const useRoute = require("./routes/user");
const { logReqRes } = require("./middleware/index");

const app = express();

// Middleware / Plugin to parse URL-encoded bodies and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logReqRes("log.txt"));

app.use("/api/users", useRoute);

createDBConnection()
  .then((db) => {
    app.locals.db = db; // Make the database connection available in app.locals
    app.listen(process.env.PORT, () => {
      console.log(`Server is up on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server due to database connection error:", error.message);
  });
