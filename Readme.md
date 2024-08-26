# Book API

## Overview

This is a Node.js application that provides a RESTful API for managing books. The application uses Express.js for the web framework and MongoDB with Mongoose for data storage and object modeling.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete book entries.
- **Search**: Filter books by title or author.
- **Sorting**: Sort books by title or published date.
- **Pagination**: Support for pagination with limit and skip parameters.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (use MongoDB Atlas or a local MongoDB instance)

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)



## Installation

Follow these steps to get your development environment set up:

1. **Navigate to the project directory:**

    ```bash
    cd api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Configuration

1. **Create an environment file:**

    Create a file named `.env` in the root of the project directory.

2. **Add the MongoDB connection string:**

    In the `.env` file, add the following line:

    ```env
    MONGO="your-mongo-connection-string"
    ```

    **Note:** Replace the connection string with your own MongoDB connection details.

## Usage

To start the server, run:

```bash
npm run dev
```



**Endpoints**

#### **Create a new book**
* **Method:** POST
* **Endpoint:** `/api/books`
* **Request Body:** A JSON object with the following fields:
  * `title`
  * `author`
  * `isbn`
  * `publishedDate`
* **Response:** A JSON object representing the newly created book, including its unique ID.

# Book API Documentation

This API provides access to a collection of books. You can retrieve a list of all books or filter and sort them based on your needs.

## Endpoints

* **GET /api/books**

This endpoint retrieves a list of books. You can use query parameters to control the pagination, filtering, and sorting of the results.

## Query Parameters

| Parameter  | Description                                            | Default Value | Allowed Values |
|------------|---------------------------------------------------------|---------------|----------------|
| limit       | The number of books to return per page                 | 10            | Positive integer |
| skip        | The number of books to skip before returning results     | 0             | Positive integer |
| search      | A search query to filter the results by title or author (optional) | -             | String         |
| sortBy      | The field to sort the results by (optional)             | -             | title, author |
| order       | The sorting order (either asc or desc, default: asc)     | asc           | asc, desc      |

## Response

The response is a JSON array containing objects representing the filtered and sorted books. Each book object will have the following properties:

* **id** (integer): The unique identifier of the book.
* **title** (string): The title of the book.
* **author** (string): The author of the book. (Optional, depending on your data model)
* **...(other properties specific to your books)**

**Example Response:**
json
```
[
  {
    "id": 1,
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien"
  },
  {
    "id": 2,
    "title": "Pride and Prejudice",
    "author": "Jane Austen"
  },
  // ... (more books)
]
```
#### **Retrieve details of a specific book**
* **Method:** GET
* **Endpoint:** `/api/books/:id`
* **Path Parameter:** `:id` - The unique ID of the book to retrieve.
* **Response:** A JSON object representing the specified book.

#### **Update a book's information**
* **Method:** PUT
* **Endpoint:** `/api/books/:id`
* **Path Parameter:** `:id` - The unique ID of the book to update.
* **Request Body:** A JSON object containing the fields to be updated.
* **Response:** A JSON object representing the updated book.

#### **Delete a specific book**
* **Method:** DELETE
* **Endpoint:** `/api/books/:id`
* **Path Parameter:** `:id` - The unique ID of the book to delete.
* **Response:** A success message or a status code indicating the success or failure of the deletion.

**Example Request**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publishedDate": "1925-04-10"
}
```




The API will be available at http://localhost:3000