const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var db;
var db_url = 'mongodb://andreas:andreas95@ds253104.mlab.com:53104/mongo_db_test2'

MongoClient.connect(db_url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('mongo_db_test2') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('overview.ejs', {quotes: result})
  })
})

app.get('/page2', function(req, res){
	var id =  req.query.id;
	db.collection('quotes').findOne({'_id': ObjectId(id)}, (err, result) => {
    	if (err) return console.log(err)
    	console.log({quotes: result})
    	res.render('page2.ejs', {quotes: result})
  })
});


