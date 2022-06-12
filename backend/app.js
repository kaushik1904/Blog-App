const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json()); //this pass all data into json format
app.use("/api/v1/users", userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log("db connect"))
  .catch((err) => console.log(err));

app.listen(3000);
