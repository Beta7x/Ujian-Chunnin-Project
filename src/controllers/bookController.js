const mysql = require('mysql');

// SQL
const sql = ('SELECT books.id, books.title, books.author, books.publisher, books.year, books.pages, books.price, books.language, category_name FROM books INNER JOIN category on books.category_id = category.id');

const sqlSearch = (`${sql} WHERE books.id LIKE ? OR books.title LIKE ? OR books.author LIKE ? OR books.publisher LIKE ? OR books.year LIKE ? OR books.pages LIKE ? OR books.price LIKE ? OR books.language LIKE ? OR category.category_name LIKE ?;`);

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Views index
exports.view = (req, res) => {    
    // Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query(sql, (err, rows) => {
            // when connection is done
            connection.release();
            if (!err) {
                res.render('index', {rows});
            } else {
                log.error(err);
            }
            console.log('Data from books table is : \n', rows);
        });
    });
};

// Find book by search
exports.find = (req, res) => {

    // Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
       
        let keyword = req.body.search;
        // Make connection using query from table books
        connection.query(sqlSearch, [
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
            '%' + keyword + '%',
        ], (err, rows) => {
            // when connection is done
            connection.release();
            if (!err) {
                res.render('index', {rows});
                console.log(keyword);
            } else {
                console.log(err);
            }
            console.log('Data from books table is : \n', rows);
        });
    });

};

// Adding book
exports.add = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query('SELECT * FROM category', (err, rows) => {
            // when connection is done
            connection.release();
            let year = [];
            
            for (let i = 1995; i <= 2023; i++) {
                year.push(i);
            }

            if (!err) {
                res.render('add-book', {rows, year});
            } else {
                log.error(err);
            }
            console.log('Data from books table is : \n', rows);
            console.log(year);
        });
    });
}