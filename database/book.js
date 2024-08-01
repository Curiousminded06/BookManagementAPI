const mongoose=require("mongoose");

//creating a book schema
const BookSchema = mongoose.Schema({
    ISBN:  String,
    title:String ,
    pubDate:String,
    language:String,
    numPage: Number,
    publication:Number,
    author: [Number],
    category:[String]
});

//Create a book model
const BookModel = mongoose.model(BookSchema);

module.exports=BookModel;