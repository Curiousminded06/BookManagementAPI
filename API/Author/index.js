//Initialise Express Router
const Router =require("express").Router();

//database models
const AuthorModel= require("../../database/author");

/*
Route -          /author
Description -    Get all authors
Access -         PUBLIC
Parameter -      none
Methods-         GET
*/
Router.get("/", async(req,res)=>{
    const getAllAuthors= await AuthorModel.find();
    // return res.json=({author:database.author});
    return res.json({author:getAllAuthors});
});

/*
Route -          /author
Description -    Get specific author based on id
Access -         PUBLIC
Parameter -      id
Methods-         GET
*/

Router.get("/:idy",async(req,res)=>{
    const getSpecificAuthor=await AuthorModel.findOne({category:req.params.idy});

    //     const getSpecificAuthor=database.author.filter(
    //         (author) => author.id ==req.params.idy
    // );
     if(getSpecificAuthor.length===0){
        return res.json({error:`No author found for the ID of ${req.params.idy}`,});
    }
    return res.json({author:getSpecificAuthor});
    
});

/*
Route -          /author/book
Description -    Get all author based on books
Access -         PUBLIC
Parameter -      isbn
Methods-         GET
*/
Router.get("/book/:isbn",async(req,res) =>{
    const getSpecificAuthor=await AuthorModel.findOne({category:req.params.isbn});

    // const getSpecificAuthor=database.author.filter((author)=>
    //     author.books.includes(req.params.isbn));
if(getSpecificAuthor.length===0){
    return res.json({error:`No author found for the book of ${req.params.isbn}`,});
}
return res.json({book:getSpecificAuthor});
});




/*
Route -          /author/add
Description -    add new author
Access -         PUBLIC
Parameter -      NONE
Methods-         POST
*/ 
Router.post("/add",(req,res)=>{
    const { newAuthor } =req.body;
    AuthorModel.create(newAuthor);
    return res.json({message:"author was added"});

    // database.author.push(newAuthor);
    // return res.json({authors:database.author});
});
/*
Route -          /author/update/name/
Description -    Update author name
Access -         PUBLIC
Parameter -      id
Methods-         PUT
*/
Router.put("/update/name/:authorId",async(req,res)=>{

    const updatedAuthor=await AuthorModel.findOneAndUpdate(
        {
            id:req.params.authorId

        },
        {
            name:req.body.newAuthor
        },
        {new:true}
    );
    // database.author.forEach((author)=>{
    //       if(author.id===parseInt(req.params.authorId))  {
    //         author.name=req.body.updatedAuthorName;
    //         return;
    //       }
    // });
    return res.json({author: updatedAuthor});
});

/*
Route -          /author/delete
Description -    delete an author
Access -         PUBLIC
Parameter -      authorid
Methods-         DELETE
*/

Router.delete("/delete/:authorId",async(req,res)=>{
    const updatedAuthorDatabase=await AuthorModel.findOneAndDelete(
        {authorId:req.params.id}
    );

    // const updatedAuthorsDatabase = database.author.filter(
    //     (author) =>author.id !== parseInt(req.params.authorId)
    // );
    // database.author=updatedAuthorsDatabase
    // 
    return res.json({message:"author got deleted"});
});
module.exports=Router;