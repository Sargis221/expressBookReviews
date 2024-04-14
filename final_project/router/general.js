const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
     
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      
      } 
        
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(res.send(JSON.stringify(books,null,4)))
        },books)})
    

    
});

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const get_author = new Promise((resolve, reject) => {   
        let booksbyauthor = [];     
           let isbns = Object.keys(books);   
              isbns.forEach((isbn) => {        
                if(books[isbn]["author"] === req.params.author) {  
                          booksbyauthor.push({"isbn":isbn,"title":books[isbn]["title"],"reviews":books[isbn]["reviews"]});}});      
                             res.send(JSON.stringify({booksbyauthor}, null, 4)); }); 
                             resolve("promise 12 resolved")     
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const get_author = new Promise((resolve, reject) => {   
        let booksbyauthor = [];     
           let isbns = Object.keys(books);   
              isbns.forEach((isbn) => {        
                if(books[isbn]["author"] === req.params.author) {  
                          booksbyauthor.push({"isbn":isbn,"title":books[isbn]["title"],"reviews":books[isbn]["reviews"]});}});      
                             res.send(JSON.stringify({booksbyauthor}, null, 4)); }); 
                             resolve("promise 12 resolved") 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
