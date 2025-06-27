const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require('./api')

require("dotenv").config();

const { DB_HOST: urlDb } = process.env;

// const urlDb = 'mongodb+srv://sledzkarol93:B7YwUSQ920oDqui5@cluster0.svdecmh.mongodb.net/'


const connection = mongoose.connect(urlDb);

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable parsing JSON body

// Your routes should be registered here, for example:
// const tasksRouter = require('./routes/api/tasks');
// app.use('/api/tasks', tasksRouter);

// In controller we using next - next is a call back function that
// process if for example wont succed to add its functionality we add

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({ message: `not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "Validation Error") {
    return res.status(400).json({ message: err.message });
  } else {
    res
      .status(500)
      .json({ message: err.message || "Something went horible wrong" });
  }
});

const startServer = async () => {
  try {
    await connection;
    console.log("DB connected");
    app.listen(3000, () => console.log("server started on 3000 port"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();