CREATE USER 'user'@'%' IDENTIFIED BY 'user'

CREATE DATABASE testDB DEFAULT CHARSET UTF8;
GRANT ALL PRIVILEGES ON testDB.* TO 'user'@'%';

USE testDB;

CREATE TABLE user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(40) NOT NULL,
    email VARCHAR(60),
    create_date TIMESTAMP
)

CREATE TABLE book(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bookName VARCHAR(30) NOT NULL,
    ISBN BIGINT(18) UNIQUE NOT NULL,
    publicationDate DATE
)

# 나중에 추가해야할 것.
userName 같은 경우에는 특수문자 불가, 오로지 영어 대소문자와 숫자로만 저장할 수 있게끔 사용자 정의 제약사항 추가해야함.