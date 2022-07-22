const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// midleware parsing
// Parsing application
app.use(bodyParser.urlencoded({ extended : false }));

// Parsing Content Types : application/json
app.use(bodyParser.json());

// Static folder/files
app.use(express.static('public'));

// Templating engine
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Routing end point
const routes = require('./src/routes/route');
app.use('/', routes);

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, connection) => {
    if (err) throw err; // !connected
    // when database connected
    console.log('Database connected! with the ID process ' + connection.threadId );
});

app.listen(PORT, () => {
    console.log(`Server running and listening on http://local~host:${PORT}`);
});