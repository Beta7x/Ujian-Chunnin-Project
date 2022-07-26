CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL, author VARCHAR(100), 
    publisher VARCHAR(100), 
    year INT,
    pages INT,
    price INT,
    language VARCHAR(100),
    category_id INT,
    PRIMARY KEY(id),
    CONSTRAINT fk_category_books
    FOREIGN KEY (category_id)
    REFERENCES books(id)
);




-- Inner Join
-- SELECT books.id, books.title, books.author, books.publisher, books.year, books.pages, books.price,books.language, category.category_name FROM books INNER JOIN category ON books.category_id = category.id;