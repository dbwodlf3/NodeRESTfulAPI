-- # DB 서버에서 수행한 명령어들..
CREATE USER 'user'@'%' IDENTIFIED BY 'user'

CREATE DATABASE testDB DEFAULT CHARSET UTF8;
GRANT ALL PRIVILEGES ON testDB.* TO 'user'@'%';

USE testDB;

CREATE TABLE user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(40) NOT NULL,
    email VARCHAR(60),
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE book(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bookName VARCHAR(30) NOT NULL,
    ISBN BIGINT(18) UNIQUE NOT NULL,
    publicationDate DATE DEFAULT CURRENT_DATE
)

-- # 나중에 추가해야할 것.
-- userName 같은 경우에는 특수문자 불가, 오로지 영어 대소문자와 숫자로만 저장할 수 있게끔 사용자 정의 제약사항 추가해야함.

-- # 데이터 추가하기. POST
INSERT INTO user(userName, password, email, create_date) VALUES('user', password('user'), 'user@test.com', CURRENT_TIMESTAMP);

INSERT INTO book(bookName, ISBN, publicationDate) VALUES("bookName", 123456789012345678, CURRENT_DATE);

-- # 데이터 삭제하기. DELETE
-- //유저 이름을 기준으로 삭제합니다.

DELETE from user where userName = "user"

-- # 데이터 업데이트 하기 PUT
-- //유저 이름을 기준으로 업데이트 합니다.

UPDATE user SET email = "user@user.com", password = password("user2") WHERE userName = "user"

-- # 데이터 쿼리 하기 GET
SELECT * FROM user WHERE userName="user"

-- 문법 구조.
-- para1 para2 para3 para4 para5 para6
-- 명령어 명령어 변수 명령어  변수 명령어
-- 스택에 집어넣고, 그것들을 하나하나 다 꺼내서 집어넣으면 되지 않을까?
-- 좋은 방법 같은데.


-- 유의 사항!! 새로운 테이블을 만들 때. GET, UPDATE, DELETE 에서 사용되는 Where절의 경우. 해당 필드 이름이 $(variable)Name 형식이어야함.
-- 하드코드로 박아서 어쩔 수가 없음 ㅠ_ㅜ...
-- 어떤식으로 연계되어 있냐면, api/$(condition)/ 으로 되어있어서 그럼. api/user/ 에서, user를 가져와서 여기에다가 Name 을 더하는 하드코드형식으로 되어 있어가지구..
-- 나중에 개선되어야 할 사항..!