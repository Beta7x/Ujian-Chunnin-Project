const mysql = require('mysql');

// SQL
const sql = ('SELECT books.id, books.title, books.author, books.publisher, books.year, books.pages, books.price, books.language, category_name FROM books INNER JOIN category on books.category_id = category.id');

const sqlSearch = (`${sql} WHERE books.title LIKE ? OR books.author LIKE ? OR books.publisher LIKE ? OR books.year LIKE ? OR books.pages LIKE ? OR books.price LIKE ? OR books.language LIKE ? OR category.category_name LIKE ?;`);

const sqlAddBook = (`INSERT INTO books (title, author, publisher, year, pages, price, language, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`);

const sqlUpdateBook = `UPDATE books SET title = ?, author = ?, publisher = ?, year = ?, pages = ?, price = ?, language = ?, category_id = ? WHERE id = ?`;

const sqlDelete = `DELETE FROM books WHERE id = ? ;`;

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// for counting question mark
function test(sql, key) {
    let questMarks = [];

    for (let i = count= 0; i < sql.length; count+=+('?' === sql[i++]));
    for (let j = 0; j < count; j++) {
        questMarks.push('%' + key + '%');
    }
    return questMarks;
}

// function get connection for category
function category(res, view, buttonText) {
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query('SELECT * FROM category', (err, rows2) => {
            // when connection is done
            connection.release();
            let button = [buttonText];
            
            let year = [];
            for (let i = 1995; i <= 2023; i++) {
                year.push(i);
            }

            if (!err) {
                res.render(view, {rows2, year, button});
            } else {
                log.error(err);
            }
            console.log('Data from books table is : \n', rows2);
            console.log(year);
            console.log(button);
        });
    });
}

// Views index
exports.view = (req, res) => {    
    // Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query(sql, (err, rows) => {
            // when connection is done
            let index = [];
            connection.release();
            if (!err) {
                for (let i = 1; i <= rows.length; i++) {
                    index.push(i);
                }
                res.render('index', {rows ,index});
            } else {
                console.log(err);
            }
            console.log('Data from books table is : \n', rows);
            console.log(index);
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
        const coutnQ = test(sqlSearch, keyword);
        // Make connection using query from table books
        connection.query(sqlSearch, coutnQ, (err, rows) => {
            // when connection is done
            connection.release();
            if (!err) {
                let number = 1;
                let numArray = [];
                for (let id in rows) {
                    numArray.push(number++);
                }

                res.render('index', {rows, numArray});
                console.log(keyword);
                console.log(numArray);
            } else {
                console.log(err);
            }
            console.log('Data from books table is : \n', rows);
        });
    });
};

// controller for get index
exports.index = (req, res) => {
    category(res, 'add-book', 'Submit');
};

// controller for Add book
exports.add = (req, res) => {
    const { title, author, publisher, year, pages, price, language, category_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query(sqlAddBook, [title, author, publisher, year, pages, price, language, category_id], (err, rows) => {
            // when connection is done
            connection.release();
            if (!err) {
                // res.render('index', {rows});
                res.redirect('/')
            } else {
                log.error(err);
            }
            console.log('Data from books table is : \n', rows);
        });
    });
};

// controller for edit book
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query(sql + ' WHERE books.id = ?', [req.params.id], (err, rows) => {
            // when connection is done
            connection.release();
            var year = [];
            for (let i = 1995; i <= 2023; i++) {
                year.push(i);
            }
            
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; // !connected
                    connection.release();
                    connection.query('SELECT * FROM category', (err, rows2) => {
                        if (!err) {
                            res.render('edit-book', {rows, rows2, year});
                        }
                    });
                });
                console.log(`Tipe rows = ${typeof rows}`);
            } else {
                console.log(err);
            }
        });
    });
};

// controller for update
exports.update = (req, res) => {
    const { title, author, publisher, year, pages, price, language, category_id } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // database query
        connection.query(sqlUpdateBook, [title, author, publisher, year, pages, price, language, category_id, req.params.id], (err, rows) => {
            // release connection
            connection.release();

            if (!err) {
                console.log('Update successfully!');
                res.redirect('/');
            } else {
                console.log(err);
            }
        });
    });
};

// controller for delete book
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // !connected
        console.log('Database connected! with the ID process ' + connection.threadId);
        // Make connection using query from table books
        connection.query(sqlDelete, [req.params.id], (err, rows) => {
            // when connection is done
            connection.release();
            
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);
            }
        });
    });
};