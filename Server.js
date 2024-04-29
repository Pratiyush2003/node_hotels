const express = require("express");
const connectDB = require("./db.js");
const personRoutes = require('./routes/PersonRoutes.js')
const MenuRouter = require('./routes/MenuRoutes.js')
require('dotenv').config();
const { json } = require("body-parser");
const app = express();
connectDB();
app.use(json());


app.use("/person" , personRoutes)
app.use("/menu", MenuRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`your app is on localhost:${PORT}`);
});
