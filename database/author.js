const mongoose=require("mongoose");

//Creating author schema
const AuthorSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//author model
const AuthorModel=mongoose.model("authors",AuthorSchema);

module.exports=AuthorModel;
