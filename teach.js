//MongoDB operators-> very powerful yet deveploper wont use them

//use map and filter 
//1.retrieve all data
//2.map and filter
//3. push the data back to database

//SIMPLE Logical operations
//Update Operators 
//$inc -> increment 
//->+1,+2,-3,-2-> works as both increment and decrement 
//$min -> minimum
//$max -> maximum
//$set ->sets the data to an object property
// book.title = "hello";-> same thing set is doing
//$unset-> removes a property from an object
/*book={
title:"hello";-> if you want to delete this data then use unset
}
*/



/*
Arrays
1.$push 
2.$pop
3.$pull->extract data,similar to filter
name=["pavan","sahil"];
name===pavan;//to be extracted
$pull:{
name:pavan;
}
4.$addToSet-> push in a clever way to an array
data existence is tested here 
pushing an id and dont want duplicates??
[id]=[1,2,1,2]❌
*/
