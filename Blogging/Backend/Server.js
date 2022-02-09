const express = require('express');
const port=8877;
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

// Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
});
const connectDb=require('./Config/DataBase')

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/BlogRoutes')

app.use('/api/',userRoutes);
app.use('/api',blogRoutes);

connectDb()
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Api is working on ${port}`);
})

// Unhandled promise Rejection
process.on("unhandled rejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);

    Server.Close(()=>{
        process.exit(1);
    });
})