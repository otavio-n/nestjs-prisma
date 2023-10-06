
# Nest.js API
This is a simple API made with the Nest.js framework and Prisma ORM.

### Clone this project
```
git clone https://github.com/otavio-n/nestjs-prisma.git
```
### Install dependencies
```
npm install
```
### Run the unit tests
```
npm run test
```

### Initialize prisma
```
npx prisma init
```
### Migrate database
```
npx prisma migrate dev --name init
```
### Run the app
```
npm run start
```

## REST API
The REST API for this project is described in the following.

### Create book
#### Example request 
`POST /books`

```
curl --location 'localhost:3000/books' \
--header 'Content-Type: application/json' \
--data '{
"title": "Lord of the Rings - The Fellowship of the Ring",
"description": "Continuing the story begun in The Hobbit this is the first part of Tolkien's epic masterpiece.",
"bar_code": "9780261102354"
}'
```
#### Response
```
Status: 201 Created
```

### List all books
#### Request
`GET /books`

```
curl --location 'localhost:3000/books'
```
#### Example response
```
Status: 200 OK
Body: [
{"title": "Lord of the Rings - The Fellowship of the Ring",
"description": "Continuing the story begun in The Hobbit, this is the first part of Tolkien's epic masterpiece.",
"bar_code": "9780261102354"},
{"title": "Lord of the Rings - The Two Towers",
"description": "Building on the story begun in The Hobbit and The Fellowship of the Ring this is the second part of Tolkien's epic masterpiece",
"bar_code": "0261102362"},
{"title": "Lord of the Rings - The Return of the King",
"description": "Special unjacketed hardback edition of the final part of J.R.R. Tolkien's epic masterpiece, The Lord of the Rings",
"bar_code": "000856714X"}
]
```
### Update book
#### Example request
`PUT /books/:id`

```
curl --location --request PUT 'localhost:3000/books/:id' \
--header 'Content-Type: application/json' \
--data '{
"title": "Lord of the Rings - The Fellowship of the Ring",
"description": "Continuing the story begun in The Hobbit this is the first part of Tolkiens'
```
#### Example response
```
Status: 200 OK
```

### Delete book
#### Example request
`DELETE /books/:id`

```
curl --location --request DELETE 'localhost:3000/books/:id' \
--header 'Content-Type: application/json'
```
#### Example response
```
Status: 200 OK
```
