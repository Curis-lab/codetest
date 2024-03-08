CREATE DATABASE Pando;
USE Pando;

CREATE TABLE post(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(225) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
)
INSERT INTO post(title, contents)
VALUES
('My First Node','A note about something');
('My Second Note','Second note')