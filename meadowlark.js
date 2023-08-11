const express = require('express');
const { engine } = require('express-handlebars');
const handlers = require('./lib/handlers');

const app = express();

// configure Handlebars view engine
app.engine('handlebars', engine());

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;
// middleware to use public folder for static resources
app.use(express.static(`${__dirname}/public`));

app.get('/', handlers.home);

app.get('/about', handlers.about);

// custom 404 page
app.use(handlers.notFound);

// curstom 500 page
app.use(handlers.serverError);

app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + 'press Ctrl-C to terminate.'));
