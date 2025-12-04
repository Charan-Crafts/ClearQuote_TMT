
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

const DB_CONNECTION = require("./config/MongoDB");

DB_CONNECTION();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Routes

const translateRoutes = require("./routes/translateRoutes");

app.use("/api/v1",translateRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})