const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");

const app = express();

app.use(express.json()); //this pass all data into json format

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);


mongoose
  .connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log("db connect"))
  .catch((err) => console.log(err));

app.listen(3000);
