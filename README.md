# NodeRESTfulAPI
Nodejs로 CRUD 기능을 하는 RESTfulAPI 를 만들어 봅시다!

# 요구사항
CURL 을 이용해서 데이터를 주고받고 할 수 있게끔 만들어야 합니다.
이 프로그램에서는 Book을 등록하고, 불러오고 할 수 있는 Restful API를 만들어 봅시다.

# 데이터 정의
DB에 저장될 Book에 대한 데이터 모델은 다음과 같습니다.


[book ERD](https://www.erdcloud.com/d/W5f2aLuJkpAEH9vFE)

# 이 프로젝트에서 Restful API 정의
## POST 요청
POST host/api/book/
book
{
    "book":[
        [bookName:"blarblar", ISBN:"blarblar", publicationDate:"blarblar"],
        ...
    ]
}

## PUT 요청 Update
PUT api/book/
{
    "changeBook":[]
}

## DELETE 요청 Delete
DELETE api/book/
{
    "delete"    :["123456789012345678", ...]
}

## GET 요청
GET host/api/book/<isbn>

# Request Method의 종류

## GET
GET Request.
일반적으로 오로지 Server에 Data를 요청할 때에만 사용됩니다.
Data를 Retrive 할것으로 요구됩니다.

## HEAD
GET Request와 비슷하지만, Body는 없습니다.

## POST
구체적으로 정의된 resource entity를 제출하는데 이용됩니다.

## PUT
request playload와 함께 해당 target resource를 전부 교체합니다.

## DELETE
구체적으로 정의된 resource를 삭제합니다.

## CONNECT
Target resource에 대한 Tunnel을 만듭니다.

## OPTIONS
target resource에 대한 통신 옵션을 describe 하는데 사용됩니다.

## TRACE
loop-bac test 를 하는데 사용됩니다.

## PATCH
해당 리소스에 대한 부분적인 수정을 할 때에 사용이 됩니다.