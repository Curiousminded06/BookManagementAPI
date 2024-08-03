require('dotenv').config();

//framework
const express=require("express");
const mongoose=require("mongoose");

//Database
const database=require("./database/database");


//Models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");

//Microservices Routes
const Books = require("./API/Book");
const Author=require("./API/Author");
const Publication=require("./API/Publication");

//establish database connection
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("connection established😈"));



//Initialsization
const booky = express();

//configuration
booky.use(express.json());

// Initialsing Microservices
booky.use("/book",Books);
booky.use("/author",Author);
booky.use("/publication",Publication);

//Where is data????(database)
booky.listen(8000,() => {
    return console.log("Hey server is running😎");
});


//Why schema?
//mongoose helps with validation,relation with data-> only for mongoDB no other DB(gf hai uski😂)
//mongoDB is schemaless,so cheers to mongoose
//mongoose model -> document model of mongoDB

//collection??->individual databases ar called as 
//document->objects inside databases
