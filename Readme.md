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

The API will be available at http://localhost:3000