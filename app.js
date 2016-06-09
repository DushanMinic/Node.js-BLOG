const express = require('express');
const app = express();

const morgan = require('morgan');
const favicon = require('serve-favicon');

app.use(morgan('dev'));
app.use(favicon(__dirname + '/views/favicon.ico'));

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
	res.render('home', { posts: posts}); //render 'home.ejs' with the list of posts
});

//blog post
app.get('/post/:id', (req, res) => {
	//find the post in the 'posts' array
	const post = posts.filter((post) => {
		return post.id == req.params.id;
	})[0]; //[0]; 


	//render the 'posts.ejs' template with the post content
res.render('post', {
	author: post.author,
	title: post.title,
	body: post.body
});
});


app.listen(8080, () => {
	console.log('server started on port 8080');
});