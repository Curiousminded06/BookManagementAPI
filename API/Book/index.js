//Initialise Express Router
const Router =require("express").Router();


//database models
const BookModel= require("../../database/book");



/*
Route -          /
Description -    Get all books
Access -         PUBLIC
Parameter -      NONE
Methods-         GET
*/

Router.get("/", async (req,res)=>{
    const getAllBooks= await BookModel.find();
    return res.json({books:getAllBooks});
});
/*
Route -          /is
Description -    Get sepcific book based on ISBN
Access -         PUBLIC
Parameter -      ISBN
Methods-         GET
*/

Router.get("/is/:isbn",async (req,res)=>{

    const getSpecificBook= await BookModel.findOne({ISBN: req.params.isbn});

    //null -> mongoose 

    // const getSpecificBook =database.books.filter(
    //     (book)=>book.ISBN===req.params.isbn);
    
    if(!getSpecificBook){
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
    }
    return res.json({book:getSpecificBook});
});
/*
Route -          /c
Description -    Get sepcific books based on category
Access -         PUBLIC
Parameter -      category
Methods-         GET
*/
Router.get("/c/:category",async(req,res)=>{

    const getSpecificBook= await BookModel.findOne({category:req.params.category});
    //     const getSpecificBook=database.books.filter((book)=>
    //         book.category.includes(req.params.category)
    // );
    if(!getSpecificBook){
        return res.json({error:`No book found for the category of ${req.params.category}`,});
    }
    return res.json({book:getSpecificBook});
});
/*
Route -          /l
Description -    Get sepcific books based on language
Access -         PUBLIC
Parameter -      language
Methods-         GET
*/




Router.get("/l/:language",async(req,res)=>{
    const getSpecificBookL= await BookModel.findOne({category:req.params.language});

        // const getSpecificBook=database.books.filter((book)=>
        //     book.language.includes(req.params.language) );
    if(!getSpecificBook){
        return res.json({error:`No book found for the language of ${req.params.language}`,});
    }
    return res.json({book:getSpecificBookL});
});
/*
Route -          /book/add
Description -    add new book
Access -         PUBLIC
Parameter -      NONE
Methods-         POST
*/ 
Router.post("/add/",async(req,res) => {
    console.log(req.body);
        const { newBook } =req.body;

        BookModel.create(newBook);

        //just msg needed 😎chill bro
        return res.json({message:"book was added"});
        // database.books.push(newBook);
        // return res.json({books:database.books});
        // return res.json({books:addNewBook});

});
/*
Route -          /book/update/title/
Description -    Update book title
Access -         PUBLIC
Parameter -      isbn
Methods-         PUT
*/ 
//isbn in paramater and title in body or isbn and title in parameter
 //forEach or map- we want to update it,not make new array like map so forEach ,but foreach require to change 1000s of data so expensive 😢(tradeoff)

 Router.put("/update/title/:isbn",async(req,res)=>{
    const updatedBook=await BookModel.findOneAndUpdate(
       {
           ISBN:req.params.isbn
       },
       {
           title:req.body.newBookTitle
       },
       {
       new:true
       });//updates data in postman as well
       // database.books.forEach((book)=>{
       //       if(book.ISBN===req.params.isbn)  {
       //         book.title=req.body.newBookTitle;
       //         return;
       //       }
       // });
       //return res.json({books: database.books});
       
       return res.json({books: updatedBook});
});
/*
Route -          /book/update/author/
Description -    update/add new author for a book
Access -         PUBLIC
Parameter -      isbn
Methods-         PUT
*/ Router.put("/update/author/:isbn",async(req,res)=>{
       //update book database  

       const updatedBook=await BookModel.findOneAndUpdate(
           {ISBN:req.params.isbn},
           {
               $addToSet:{
                   author: req.body.newAuthor
               }
           },
           {
               new:true,
           }
       );
       // database.books.forEach((book) =>{
       //     if(book.ISBN===req.params.isbn){
       //         return book.author.push(parseInt(req.params.authorId)); //author object
       //     }
       // });
       // //update author database

       const updatedAuthor= await AuthorModel.findOneAndUpdate(
           {id:req.body.newAuthor},
           {
               $addToSet:{
                   books:req.params.isbn
               }
           },{new:true }
       );
       // database.author.forEach((book)=>{
       //     if(author.id===parseInt(req.params.authorId)){
       //         return author.books.push(req.params.isbn); //book object
       //     }
       // });
   return res.json({books:updatedBook,author:updatedAuthor});
});
/*
Route -          /book/delete
Description -    delete a book
Access -         PUBLIC
Parameter -      isbn
Methods-         DELETE
*/
Router.delete("/delete/:isbn",async(req,res)=>{

    const updatedBookDatabase=await BookModel.findOneAndDelete(
        {ISBN:req.params.isbn}
    );
    // //Tradeoff:-replace the whole object(filter ✅) or edit at single point directly to master database
    // const updatedBookDatabase = database.books.filter(
    //     (book) =>book.ISBN !== req.params.isbn
    // );
    // //return new array,===->strictly equal to ,!==->strictly not equal to

    database.books=updatedBookDatabase
    return res.json({books: database.books});
});
/*
Route -          /book/delete/author
Description -    delete a author from book
Access -         PUBLIC
Parameter -      isbn,author id
Methods-         DELETE
*/
Router.delete("/delete/author/:isbn/:authorId",async (req,res)=>{
        //update the book database 
        const updatedBook=await BookModel.findOneAndUpdate(
            {ISBN:req.params.isbn},
            {
                $pull:{
                    author:parseInt(req.params.authorId)
                }
            },
            {
                new:true
            }
        );
        // database.books.forEach((book)=>{
        //     if(book.ISBN===req.params.isbn){
        //         const newAuthorList= book.author.filter(
        //             (author)=>author!==parseInt(req.params.authorId));
        //         book.author=newAuthorList;
        //         return;
        //     }
        // });
        //update the author database
        const updatedAuthor=await AuthorModel.findOneAndUpdate(
            {id:parseInt(req.params.authorId)},
            {$pull:{
                books:req.params.isbn
            }},
            {new:true}
        );
//         database.author.forEach((author)=>{
//             if(author.id===parseInt(req.params.authorId)){
//                 const newBooksList = author.books.filter(
//                     (book)=>book !==req.params.isbn);
//                     author.books= newBooksList;
//                     return;
//             }
// })
        return res.json({
            message:"author was deleted 😒",
            book:updatedBook,
            author:updatedAuthor
            });
});
module.exports=Router;