CREATE DATABASE IF NOT EXISTS Pando;

USE Pando;

DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Category;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL
);


CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE Post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    title VARCHAR(225),
    imageURL VARCHAR(255),
    content TEXT,
    referencesURL VARCHAR(1000),
    category_id INT,
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);
