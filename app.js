const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 


const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(favicon(__dirname + '/views/favicon.ico'));
app.use(bodyParser.urlencoded({extended : true}));

MongoClient.connect('mongodb://dushan:marvel123@ds011734.mlab.com:11734/blog-node',(err, database) => {
	//start dushan marvel123
	if(err) return console.log(err);

	db = database;

	app.listen(PORT, () => {
	console.log('Server started on port:',PORT);
});

});

// fake posts
const posts = [
	{
		id: 1,
		author: 'Vucic',
		title: 'Vucicu Pederu!',
		body: 'Vucic obecao: Za dve godine izlazimo iz krize.'
	},
	{
		id: 2,
		author: 'Vucic',
		title: 'Za dve godine....',
		body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
	},
	{
		id: 3,
		author: 'Sinisa Mali',
		title: 'Bugarski biznismen',
		body: 'Clanak broj 3'
	},
	{
		id: 4,
		author: 'Radulovic',
		title: 'Dosta je bilo!',
		body: 'Clanak broj 4'
	}
];

app.set('view engine', 'ejs');




//homepage
app.get('/', (req, res) => {
	//res.render('home', { posts: posts}); //render 'home.ejs' with the list of posts

	db.collection('articles').find().toArray(function(err, results) {
		if(err) return console.log(err);

		res.render('home', {articles : results});
		
	});

});

//blog post
app.get('/post/:id', (req, res) => {

// 	// find the post in the 'posts' array

	db.collection('articles').find({ _id : new ObjectId(req.params.id) }).toArray(function(err, results) {
		if(err) return console.log(err);
		
		const post = results[0];
	// 	 // render the 'posts.ejs' template with the post content
		res.render('post', {
			author: post.author,
			title: post.postTitle,
			body: post.message
		});
		
	});


});


app.get('/newpost', (req, res) => {
	res.render('newPost');
});

//Create new post

app.post('/newpost', (req, res) => {
	db.collection('articles').save(req.body, (err, result) => {
		if(err) return console.log(err);

		console.log('Saved to the database!');
		res.redirect('/');
	});

	console.log(req.body);
});

// List of Articles
app.get('/articles', (req, res) => {

	db.collection('articles').find().toArray(function(err, results) {
		if(err) return console.log(err);

		res.render('articlesList', {articles : results});
	});
	
});
