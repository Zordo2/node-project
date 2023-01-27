require("dotenv").config();
const express = require("express");
const app = express();
const { PORT, MONGO_DB_URL } = process.env;
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const cors = require("cors");
const morgan = require("morgan");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_DB_URL).then(() => {
  console.log("Mongo DB Condected Sucssefully");
});
app.use(cors());
app.use("/products", productRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
