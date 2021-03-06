const express = require('express');
const app = express();  // creates an instance of an express application
const nunjucks = require('nunjucks');


const people = [{name: 'Shon'}, {name: 'Matt'}, {name: 'Arik'}];
// needed for getting access to request body of POST / PUT req's
// var bodyParser = require('body-parser');

/*
The order of middleware loading is important: middleware functions
that are loaded first are also executed first.

If myLogger is loaded after the route to the root path, the request n
ever reaches it and the app doesn’t print “LOGGED”, because the
route handler of the root path terminates the request-response cycle.
*/


// `bodyParser.urlencoded()` returns a middleware function
// (takes req, res, and next) that calls `next()` internally
// app.use('/', bodyParser.urlencoded());

app.use('/', function(req, res, next){
  // console.log('/');
  if(res.status(200)) console.log(200);
  // nunjucks.render('index.html');
  res.render('index', {title: 'Hall of Fame', people: people} );

  // next();
});


app.get('/special/', function(req, res, next){
  // if()
  console.log("you reached the special area.");
});

app.get('/special/subpath', function(req, res, next){
  // if()
  console.log("you reached the special subpath area.");
});

app.get('/is-anybody-in-there', function (req,res, next){
  console.log('/is-anybody-in-there');
  next();
});


app.get('/modernism', function(req, res){
  // console.log(req.body);
  res.send(`/modernism \n${Date.now}`);
});




// nunjucks
// in some file that is in the root directory of our application... how about app.js?
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
  if(err) throw err;
  console.log(output);
  // res.send(output);
});

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates




app.get('/', function (req, res) {
  res.send('Hello World!');
});

///////////////////////////////////////////



// The app starts to listens on port 1337 for connections.
const PORT = 1337;
app.listen(PORT, function(){
  console.log(`connected to ${PORT}`);
});


// The following examples illustrate defining simple routes.

// Respond with Hello World! on the homepage:

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
// Respond to POST request on the root route (/), the application’s home page:

// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// })
// Respond to a PUT request to the /user route:

// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user')
// })
// Respond to a DELETE request to the /user route:

// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user')
// })
