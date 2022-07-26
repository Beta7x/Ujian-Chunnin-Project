const mysql = require('mysql');

const sqlListAll = 'SELECT * FROM category';

const sqlAddCategory = 'INSERT INTO category (category_name, description) VALUES (?, ?)';

const sqlDelCategory = 'DELETE FROM category WHERE id = ?';

const sqlUpCategory = 'UPDATE category SET category_name = ?, description = ? WHERE id = ? ';

const pool = mysql.createPool({
    connectionLimit: 10000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        console.log('successfully connected to the database!');
        connection.query(sqlListAll, (err, rows) => {
            connection.release();
            if (!err) {
                res.render('category', {rows});
            } else {
                console.log(err);
            }
            console.log('Data from category is : \n', rows);
        });
    });
};

exports.form = (req, res) => {
    res.render('add-category');
};

exports.add = (req, res) => {
    const {category_name, description} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected');
        connection.query(sqlAddCategory, [category_name, description], (err, rows) => {
            connection.release();
            if (!err) {
                res.redirect('/category');
            } else {
                console.log(err.message);
            }
            console.log('Data from input is : \n', rows);
        });
    });
};

exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected');

        connection.query(sqlListAll + ' WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('edit-category', {rows});
            } else {
                console.log(err);
            }
            console.log(rows);
        });
    });
};

// controller for update category [POST]
exports.update = (req, res) => {
    const { category_name, description } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected');
        
        connection.query(sqlUpCategory, [category_name, description, req.params.id], (err, rows) => {
            connection.release();
            
            if (!err) {
                console.log('Category updated');
                res.redirect('/category');
            } else {
                console.log(err.message);
            }
        });
    });
};

exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected');
        connection.query(sqlDelCategory, [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                console.log(`Data with the id : ${req.params.id} from category was deleted`);
                res.redirect('/category');
            } else {
                console.log(err);
            }
        });
    });
};