var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var server = require('../serverlogic/serverlogic.js')

function Books() {
  return knex('books');
}

router.get('/books', function(req, res, next) {
  Books().select().then(function (books) {
    res.render('books/index', {books: books});
  })
});


router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books/add', function(req,res,next){
  var query = "INSERT into books VALUES(default, '"+req.body.author+"','"+ req.body.title+"','"+ req.body.description + "',"+req.body.rating+");"
  server.runQuery(query, function(results){
    res.redirect('/')
  })
})

router.get('/books/show/:id', function(req, res, next) {
  var query = "SELECT * FROM books where id="+req.params.id
  server.runQuery(query,function(result){
    var book = result.rows[0]
    res.render('books/show', {book: book});
  })
});

router.get('/books/edit/:id', function(req, res, next) {
  var query = "SELECT * FROM books where id="+req.params.id
  server.runQuery(query,function(result){
  var book = result.rows[0]
  res.render('books/edit', {book: book});
});
});

router.post('/books/:id/edit', function(req,res,next){
  var query = "UPDATE books SET author='"+req.body.author+"',title='"+req.body.title+"', rating="+req.body.rating+", description='"+req.body.description+"' WHERE id="+req.params.id
  server.runQuery(query, function(results) {
    res.redirect('/')
  })
})

router.post('/books/delete/:id', function(req,res,next){
  var query = "DELETE FROM books WHERE id="+req.params.id
  server.runQuery(query, function(results){
    res.redirect("/")
  })
})

module.exports = router;
