require('dotenv').config();

//framework
const express=require("express");
const mongoose=require("mongoose");

//Database
const database=require("./database/database");


//establish database connection
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("connection established😈"));
//Initialsization
const booky = express();

//configuration
booky.use(express.json());


//Where is data????(database)


/*
Route -          /
Description -    Get all books
Access -         PUBLIC
Parameter -      NONE
Methods-         GET
*/

booky.get("/",(req,res)=>{
    return res.json=({books:database.books});
});

/*
Route -          /is
Description -    Get sepcific book based on ISBN
Access -         PUBLIC
Parameter -      ISBN
Methods-         GET
*/

booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook =database.books.filter(
        (book)=>book.ISBN===req.params.isbn);
    
    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the ISBn of ${req.params.isbn}`,});
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
booky.get("/c/:category",(req,res)=>{
        const getSpecificBook=database.books.filter((book)=>
            book.category.includes(req.params.category)
    );
    if(getSpecificBook.length===0){
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




booky.get("/l/:language",(req,res)=>{
        const getSpecificBook=database.books.filter((book)=>
            book.language.includes(req.params.language)
    );
    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the language of ${req.params.language}`,});
    }
    return res.json({book:getSpecificBook});
});
/*
Route -          /author
Description -    Get all authors
Access -         PUBLIC
Parameter -      none
Methods-         GET
*/
booky.get("/author",(req,res)=>{
    return res.json=({author:database.author});
});

/*
Route -          /author
Description -    Get specific author based on id
Access -         PUBLIC
Parameter -      id
Methods-         GET
*/

booky.get("/author/:idy",(req,res)=>{
        const getSpecificAuthor=database.author.filter(
            (author) => author.id ==req.params.idy
    );
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
booky.get("/author/book/:isbn",(req,res) =>{
    const getSpecificAuthor=database.author.filter((author)=>
        author.books.includes(req.params.isbn)
);
if(getSpecificAuthor.length===0){
    return res.json({error:`No author found for the book of ${req.params.isbn}`,});
}
return res.json({book:getSpecificAuthor});
});



/*
Route -          /publications
Description -    Get all publications
Access -         PUBLIC
Parameter -      NONE
Methods-         GET
*/

booky.get("/publications",(req,res)=>{
    return res.json({publications:database.publication});
})

/*
Route -          /publications
Description -    get specific publication
Access -         PUBLIC
Parameter -      id
Methods-         GET
*/


booky.get("/publications/:id",(req,res) =>{
    const getSpecificPublication=database.publication.filter((publication)=>
        (publication) => publication.id ===req.params.id
);
if(getSpecificPublication.length===0){
    return res.json({error:`No Publication found for the id of ${req.params.id}`,});
}
return res.json({book:getSpecificPublication});
});



/*
Route -          /author/book
Description -    Get all publications based on books
Access -         PUBLIC
Parameter -      isbn
Methods-         GET
*/

booky.get("/publications/book/:isbn",(req,res) =>{
    const getSpecificPublication=database.publication.filter((publication)=>
        publication.books.includes(req.params.isbn)
);
if(getSpecificPublication.length===0){
    return res.json({error:`No publication found for the book of ${req.params.isbn}`,});
}
return res.json({book:getSpecificPublication});
});


/*
Route -          /book/add
Description -    add new book
Access -         PUBLIC
Parameter -      NONE
Methods-         POST
*/ 
booky.post("/book/add/",(req,res) => {
    console.log(req.body);
        const { newBook } =req.body;

        database.books.push(newBook);
        return res.json({books:database.books});
});

/*
Route -          /author/add
Description -    add new author
Access -         PUBLIC
Parameter -      NONE
Methods-         POST
*/ 
booky.post("/author/add",(req,res)=>{
    const { newAuthor } =req.body;

    database.author.push(newAuthor);
    return res.json({authors:database.author});
});

/*
Route -          /publication/add
Description -    add new publication
Access -         PUBLIC
Parameter -      NONE
Methods-         POST
*/ 
booky.post("/publication/add",(req,res)=>{
    const { newPublication } =req.body;

    database.author.push(newPublication);
    return res.json({publications:database.publication});
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

booky.put("/book/update/title/:isbn",(req,res)=>{
        database.books.forEach((book)=>{
              if(book.ISBN===req.params.isbn)  {
                book.title=req.body.newBookTitle;
                return;
              }
        });
        return res.json({books: database.books});
});
/*
Route -          /book/update/author/
Description -    update/add new author for a book
Access -         PUBLIC
Parameter -      isbn
Methods-         PUT
*/ booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
        //update book database
        database.books.forEach((book) =>{
            if(book.ISBN===req.params.isbn){
                return book.author.push(parseInt(req.params.authorId)); //author object
            }
        });
        //update author database
        database.author.forEach((book)=>{
            if(author.id===parseInt(req.params.authorId)){
                return author.books.push(req.params.isbn); //book object
            }
        });
    return res.json({books:database.books,author:database.author});
});
/*
/*
Route -          /author/update/name/
Description -    Update author name
Access -         PUBLIC
Parameter -      id
Methods-         PUT
*/
 booky.put("/author/update/name/:authorId",(req,res)=>{
    database.author.forEach((author)=>{
          if(author.id===parseInt(req.params.authorId))  {
            author.name=req.body.updatedAuthorName;
            return;
          }
    });
    return res.json({author: database.author});
});

/*
Route -          /publication/update/name/
Description -    Update publication name
Access -         PUBLIC
Parameter -      id
Methods-         PUT
*/

booky.put("/publication/update/name/:publicationId",(req,res)=>{
    database.publication.forEach((publication)=>{
          if(publication.id===parseInt(req.params.publicationId))  {
            publication.name=req.body.updatedpublicationName;
            return;
          }
    });
    return res.json({publication: database.publication});
});

/*
Route -          /publication/update/book
Description -    Update/add new book to a publication
Access -         PUBLIC
Parameter -      isbn
Methods-         PUT
*/

booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication database
    database.publication.forEach((publication)=>{ //publiactions or publication??
        if(publication.id===req.body.pubId){
           return publication.books.push(req.params.isbn);
        }
        });
    //update book database
    database.books.forEach((book)=>{
        if (book.ISBN===req.params.isbn){
            book.publication=req.params.pubId;
            return;
        }
    });   
    return res.json({books:database.books,
        publication:database.publication,
        message:"Successfully updated publication"});
});

/*
Route -          /book/delete
Description -    delete a book
Access -         PUBLIC
Parameter -      isbn
Methods-         DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{

    //Tradeoff:-replace the whole object(filter ✅) or edit at single point directly to master database
    const updatedBookDatabase = database.books.filter(
        (book) =>book.ISBN !== req.params.isbn
    );
    //return new array,===->strictly equal to ,!==->strictly not equal to

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
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
        //update the book database 
        database.books.forEach((book)=>{
            if(book.ISBN===req.params.isbn){
                const newAuthorList= book.author.filter(
                    (author)=>author!==parseInt(req.params.authorId));
                book.author=newAuthorList;
                return;
            }
        });
        //update the author database
        database.author.forEach((author)=>{
            if(author.id===parseInt(req.params.authorId)){
                const newBooksList = author.books.filter(
                    (book)=>book !==req.params.isbn);
                    author.books= newBooksList;
                    return;
            }
})
        return res.json({
            message:"author was deleted 😒",
            book:database.books,
            author:database.author
            });
});
/*
Route -          /author/delete
Description -    delete an author
Access -         PUBLIC
Parameter -      authorid
Methods-         DELETE
*/

booky.delete("/author/delete/:authorId",(req,res)=>{

    const updatedAuthorsDatabase = database.author.filter(
        (author) =>author.id !== parseInt(req.params.authorId)
    );
    database.author=updatedAuthorsDatabase
    return res.json({author: database.author});
});
/*
Route -          /publication/delete
Description -    delete a publication
Access -         PUBLIC
Parameter -      pubId
Methods-         DELETE
*/

booky.delete("/publication/delete/:pubId",(req,res)=>{

    const updatedPublicationDatabase = database.publication.filter(
        (publication) =>publication.id !== parseInt(req.params.pubId)
    );
    database.publication=updatedPublicationDatabase
    return res.json({publication: database.publication});
});
/*
Route -          /publication/delete/book
Description -    delete a book from publication
Access -         PUBLIC
Parameter -      isbn,pubId
Methods-         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
        //update publication database, not array here!!!=> 1 to 0,10 to 9
        database.publication.forEach((publication)=>{
            if(publication.id===parseInt(req.params.pubId)){
                const newBooksList= publication.books.filter(
                    (book)=> book!==req.params.isbn
                );
                publication.books=newBooksList;
                return;
            }
        });
        //update book database 
        database.books.forEach((book)=>{
            if(book.ISBN===req.params.isbn){
                book.publication=0;//no publication available
                return;
            }
        });
        return res.json({books:database.books,database,publication:database.publication})
});

booky.listen(8000,() => console.log("Hey server is running😎"));


//Why schema?
//mongoose helps with validation,relation with data-> only for mongoDB no other DB(gf hai uski😂)
//mongoDB is schemaless,so cheers to mongoose
//mongoose model -> document model of mongoDB

//collection??->individual databases ar called as 
//document->objects inside databases
