require('./init.js')();

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '../../public'));
app.use(bodyParser.json())

var db;
var db_url = 'mongodb://andreas:andreas95@ds253104.mlab.com:53104/mongo_db_test2'

MongoClient.connect(db_url, { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err)
	db = client.db('mongo_db_test2') // whatever your database name is
	app.listen(process.env.port || 3000, () => {
		console.log(`listening on ${process.env.port}`)
	})
})

app.use(bodyParser.urlencoded({extended: true}));

//Routing
app.get('/', (req, res) => {
	db.collection('taskDescription').find().toArray((err, result) => {
		if (err) return console.log(err)
		res.render('overview.ejs', {taskDescription: result})
	})
})

app.get('/editor', function(req, res){
	var id =  req.query.id;
	db.collection('taskDescription').findOne({'_id': ObjectId(id)}, (err, result) => {
		if (err) return console.log(err)
		res.render('editor.ejs', {tasks: result});
	})
});

app.get('/createSectionDescription', function(req, res){
	db.collection('sectionDescription').find().toArray((err, result) => {
		if (err) return console.log(err)
		res.render('createSectionDescription.ejs', {sectionDescription: result})
	})
});

app.get('/createTaskDescription', function(req, res){
	var id =  req.query.id;
	db.collection('sectionDescription').findOne({'_id': ObjectId(id)}, (err, result) => {
		if (err) return console.log(err)
		res.render('createTaskDescription.ejs', {sectionDescription: result})
	})
});


//Save taskdescription in DB
app.post('/taskDescription', (req, res) => {
	db.collection('taskDescription').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database');
		res.redirect('/');
	})
})


//Save Section Description
app.post('/sectionDescription', (req, res) => {
	db.collection('sectionDescription').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to collection section description');
		res.redirect('/createSectionDescription');
	})
})


//Update tasks
app.put('/taskDescription', (req, res) => {
	var tasknumberSend =  req.body.tasknumber;
	db.collection('taskDescription').findOneAndUpdate({tasknumber: tasknumberSend}, {
		$set: {
  			csssolution_user: req.body.csssolution_user,
  			htmlsolution_user: req.body.htmlsolution_user
		}
	}, 
	{
		upsert: true
	}, (err, result) => {
		if (err) return res.send(err) 
  		res.send(result)
	})
})