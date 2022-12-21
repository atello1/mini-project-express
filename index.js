require('dotenv').config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT | 5000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
const database_url = process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL : process.env.CLOUD_DATABASE_URL;

mongoose.connect(database_url, { useNewUrlParser: true });
console.log("database url",database_url)


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(PORT, () => console.log("Server running on port " + PORT));