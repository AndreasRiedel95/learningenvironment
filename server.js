const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

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

app.post('/tasks', (req, res) => {
  db.collection('tasks').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  })
})

app.get('/', (req, res) => {
  db.collection('tasks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('overview.ejs', {tasks: result})
  })
})

app.get('/page2', function(req, res){
	var id =  req.query.id;
	db.collection('tasks').findOne({'_id': ObjectId(id)}, (err, result) => {
    	if (err) return console.log(err)
    	console.log({tasks: result})
    	res.render('page2.ejs', {tasks: result});
  })
});

app.put('/tasks', (req, res) => {
  var tasknumberSend =  req.body.tasknumber;
  db.collection('tasks')
  .findOneAndUpdate({tasknumber: tasknumberSend}, {
    $set: {
      csssolution_user: req.body.csssolution_user,
      htmlsolution_user: req.body.htmlsolution_user
    }
  }, {
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err) 
      res.send(result)
  })
})


