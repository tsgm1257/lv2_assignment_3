# Library Management System API

A RESTful API to manage a library system where users can add, view, update, delete, and borrow books. Built with Express, TypeScript, and MongoDB using Mongoose.

---

## Live Server

https://library-management-puce.vercel.app

---

## Tech Stack

- Backend: Node.js, Express.js
- Language: TypeScript
- Database: MongoDB with Mongoose
- Validation: Mongoose schema validators
- Tools: ts-node-dev, dotenv

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/library-management.git

# 2. Navigate to the project
cd library-management

# 3. Install dependencies
npm install

# 4. Add your environment config
touch .env
```

## .env format

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library

```
# 5. Start the dev server
npm run dev
```

## API Endpoints

### Books

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | /api/books          | Create a new book                  |
| GET    | /api/books          | Get all books (supports filtering) |
| GET    | /api/books/\:bookId | Get a book by ID                   |
| PUT    | /api/books/\:bookId | Update a book by ID                |
| DELETE | /api/books/\:bookId | Delete a book by ID                |

### Borrowing

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| POST   | /api/borrow | Borrow a book                 |
| GET    | /api/borrow | Get summary of borrowed books |

## Sample Book Object

```
{
            "_id": "685624877643d1e41dcf0774",
            "title": "The Theory of Everything",
            "author": "Stephen Hawking",
            "genre": "SCIENCE",
            "isbn": "9780553380163",
            "description": "An overview of cosmology and black holes.",
            "copies": 42,
            "available": true,
            "createdAt": "2025-06-21T03:18:31.284Z",
            "updatedAt": "2025-06-21T03:41:58.128Z"
        }
```

## API Features

### Book APIs

#### `POST /api/books`

- **Purpose:** Create a new book
- **Request Body:**
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "FICTION",
  "isbn": "9780061122415",
  "description": "A novel about following your dreams.",
  "copies": 10
}
```
### Validation:

- Required fields: title, author, isbn, genre, copies

- copies must be >= 0

## GET /api/books
### Purpose: Get all books

 ### Query Parameters
- filter (by genre)

- sort (asc or desc)

- limit (number of books to retrieve)

### Example:
```
/api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=5
```

## PUT /api/books/:bookId
- Purpose: Update book info

- Request Body: Any valid book fields

- Note: Runs Mongoose validators during update

## DELETE /api/books/:bookId
- Purpose: Delete a book

- Validation: Ensures bookId is valid, else returns 400

## POST /api/borrow
- Purpose: Borrow one or more copies of a book

## GET /api/borrow
- Purpose: Aggregated summary of borrowed books

## Features

- Full CRUD for books

- Genre filtering, sorting, and pagination

- Book borrowing with stock management

- Availability updates based on book copies

- Aggregated summary of borrowed books

- Mongoose instance methods and middleware

- Structured and consistent error responses

## Author

### Name: Tanzeem Siddique

### Project: Milestone 3 (Library API with validation)
