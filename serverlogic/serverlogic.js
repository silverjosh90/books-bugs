var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL|| 'postgres://localhost/books_bugs';
var app = express();
var knex = require('knex')
require('dotenv').load()


function runQuery (query,callback){
   pg.connect(connectionString, function(err, client, done) {
     if (err) { done() ; console.log(err); return; }
     client.query(query, function(err,results){
       done();
       if(err) {console.log(err); return; }
       callback(results);
     });
   });
 }

 module.exports = {
   runQuery: runQuery
 }
