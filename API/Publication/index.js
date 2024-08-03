//Initialise Express Router
const Router =require("express").Router();

//database models
const PublicationModel= require("../../database/publication");
/*
Route -          /publications
Description -    Get all publications
Access -         PUBLIC
Parameter -      NONE
Methods-         GET
*/

Router.get("/",async(req,res)=>{
    const getAllPublication= await PublicationModel.find();
    // return res.json({publications:database.publication});
        return res.json({publications:getAllPublication});

})

/*
Route -          /publications
Description -    get specific publication
Access -         PUBLIC
Parameter -      id
Methods-         GET
*/


Router.get("/:id",async(req,res) =>{
    const getSpecificPublication= await PublicationModel.findOne({id:req.params.id});
//     const getSpecificPublication=database.publication.filter((publication)=>
//         (publication) => publication.id ===req.params.id
// );
if(!getSpecificPublication){
    return res.json({error:`No Publication found for the id of ${req.params.id}`,});
}
return res.json({book:getSpecificPublication});
});

/*
Route -          /publications/book
Description -    Get all publications based on books
Access -         PUBLIC
Parameter -      isbn
Methods-         GET
*/

Router.get("/book/:isbn",async(req,res) =>{
    const getSpecificPublication= await PublicationModel.findOne({ISBN:req.params.isbn});

//     const getSpecificPublication=database.publication.filter((publication)=>
//         publication.books.includes(req.params.isbn)
// );
if(!getSpecificPublication){
    return res.json({error:`No publication found for the book of ${req.params.isbn}`,});
}
return res.json({book:getSpecificPublication});
});



/*
Route -          /publication/add
Description -    add new publication
Access -         PUBLIC
Parameter -      NONE
Methods-         POST
*/ 
Router.post("/add",(req,res)=>{
    const { newPublication } =req.body;
    PublicationModel.create(newPublication);
    return res.json({message:"publication was added"});

    // database.author.push(newPublication);
    // return res.json({publications:database.publication});
});

/*
Route -          /publication/update/name/
Description -    Update publication name
Access -         PUBLIC
Parameter -      id
Methods-         PUT
*/

Router.put("/update/name/:publicationId",async(req,res)=>{
    const updatedPublication=await PublicationModel.findOneAndUpdate(
        {
            id:req.params.publicationId

        },
        {
            name:req.body.newPublication
        },
        {new:true}
    );
    // database.publication.forEach((publication)=>{
    //       if(publication.id===parseInt(req.params.publicationId))  {
    //         publication.name=req.body.updatedpublicationName;
    //         return;
    //       }
    // });
    return res.json({publication: updatedPublication});
});

/*
Route -          /publication/update/book
Description -    Update/add new book to a publication
Access -         PUBLIC
Parameter -      isbn
Methods-         PUT
*/

Router.put("/update/book/:isbn",(req,res)=>{
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
Route -          /publication/delete
Description -    delete a publication
Access -         PUBLIC
Parameter -      pubId
Methods-         DELETE
*/

Router.delete("/delete/:pubId",async(req,res)=>{

    const updatedPublicationDatabase =await PublicationModel.findOneAndDelete(
        {pubId:req.params.id}
    );
    // const updatedPublicationDatabase = database.publication.filter(
    //     (publication) =>publication.id !== parseInt(req.params.pubId)
    // );
    // database.publication=updatedPublicationDatabase
    // return res.json({publication: database.publication});
    return res.json({message:"publication got deleted"});
});
/*
Route -          /publication/delete/book
Description -    delete a book from publication
Access -         PUBLIC
Parameter -      isbn,pubId
Methods-         DELETE
*/
Router.delete("/delete/book/:isbn/:pubId",(req,res)=>{
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
        
        return res.json({books:database.books,publication:database.publication});
});


module.exports=Router;