'use strict';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

/* Default routes */
app.get("/", (req, res) => {
  res.send("<h1>Welcome to URL sortner!</h1>");
});

/* require routes */
require("./routes")(app);

/* Declare PORT and make a connection */
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
