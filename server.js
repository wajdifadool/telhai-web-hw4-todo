const path = require('path');
// get Expres
const express = require('express');

const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 8000;
// get the Connection DB from  the db file
const connectDB = require('./config/db');

connectDB(); // invoke the Connect DB

// to create routes and the server it self
const app = express();

// static folder we need it for
// public is our dist folder for the
//
// im  going to see my HTML page.

// So basically what we want to do is have this public folder be our new dist folder for the front end.

// So when we run NPM, run, build all the production files, go into here and we can then load it in

//the browser.
app.use(express.static(path.join(__dirname, 'public'))); //
// body Parser MiddleWare
app.use(express.json()); // will allow us to send raw json data to the server (the server )
app.use(express.urlencoded({ extended: false })); // this is the common way to do it

// cors middleware
// app.use(cors); // this is not good it will enable request form anywhere

app.use(
  cors({
    // enbled URL that allowed to route to the server on both envoirment , dev and production
    origin: ['http://127.0.0.1:5000'],
    credentials: true,
  })
);
//create the server
app.listen(port, () => console.log(`Server Listening on Port${port}`));

// create Routes
// this is my basic route for testing
app.get('/', (req, res) => {
  // res.send({message:"Hello World"}) ; // will send JSON
  res.json({ message: 'Welcom to my To-do Rest API' });
});

// Link the /Api/ideas
const todosRouter = require('./routes/todos');

// app.use("EndPoint", "Linked Location" )
app.use('/api/todos', todosRouter); // this is how we link

const authRoutes = require('./routes/users');
app.use('/', authRoutes); // this is how we link
