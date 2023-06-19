require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const userRoute =  require("./routes/user.route");
const authRoute = require("./routes/auth.route");

const cors = require('cors');


const app = express();
const port = 8020;


app.use(cors());
// { origin: "http://localhost:3000", credentials: true }
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(port, () => {
  connect();
  console.log(`Backend server is running! on port ${port}`);
});