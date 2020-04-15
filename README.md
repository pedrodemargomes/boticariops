## Create user

#### POST http://localhost:3000/user
```bash
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'password=12345678' \
--data-urlencode 'email=email@email.com' \
--data-urlencode 'cpf=15350946056' \
--data-urlencode 'username=teste'
```
##### Response
```json
{
    "username": "teste",
    "email": "email@email.com",
    "cpf": "15350946056"
}
```

## Login

#### POST http://localhost:3000/user/login
```bash
curl --location --request POST 'http://localhost:3000/user/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=email@email.com' \
--data-urlencode 'password=12345678'
```
##### Response
```json
{
    "user": {
        "username": "teste",
        "email": "email@email.com",
        "cpf": "15350946056"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk2OWVjYzQ1NGRlMDY3YWJhZWUyMTEiLCJjcmVhdGVkQXQiOjE1ODY5MjkzNjQyODksImlhdCI6MTU4NjkyOTM2NCwiZXhwIjoxNTg2OTMyOTY0fQ.M1Bg4Eh9emkbdIhVF6S3TVi4DFsGCLK1uy7tRxtDSn4"
}
```

## Register purchase

#### POST http://localhost:3000/purchase
```bash
curl --location --request POST 'http://localhost:3000/purchase' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=abcde' \
--data-urlencode 'value=2500' \
--data-urlencode 'date=04/12/1999' \
--data-urlencode 'cpf=15350946056'
```
##### Response
```json
{
    "status": "APPROVED",
    "code": "abcde",
    "value": 2500,
    "date": "1999-04-12T03:00:00.000Z",
    "cpf": "15350946056"
}
```

## Get purchases

#### GET http://localhost:3000/purchase
```bash
curl --location --request GET 'http://localhost:3000/purchase' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk2OWVjYzQ1NGRlMDY3YWJhZWUyMTEiLCJjcmVhdGVkQXQiOjE1ODY5MjkzNjQyODksImlhdCI6MTU4NjkyOTM2NCwiZXhwIjoxNTg2OTMyOTY0fQ.M1Bg4Eh9emkbdIhVF6S3TVi4DFsGCLK1uy7tRxtDSn4'
```
##### Response
```json
{
    "purchases": [
        {
            "status": "APPROVED",
            "code": "abcde",
            "value": 2500,
            "date": "1999-04-12T03:00:00.000Z",
            "cpf": "15350946056",
            "cashbackpercentage": 20,
            "cashbackvalue": 500
        }
    ]
}
```

## Get cashback value

#### GET  http://localhost:3000/purchase/cashback
```bash
curl --location --request GET 'http://localhost:3000/purchase/cashback' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk2OWVjYzQ1NGRlMDY3YWJhZWUyMTEiLCJjcmVhdGVkQXQiOjE1ODY5MjkzNjQyODksImlhdCI6MTU4NjkyOTM2NCwiZXhwIjoxNTg2OTMyOTY0fQ.M1Bg4Eh9emkbdIhVF6S3TVi4DFsGCLK1uy7tRxtDSn4'
```
##### Response
```json
{
    "credit": 3154
}
```

