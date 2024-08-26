import express from 'express';
import { addBooks, deleteBook, editBook, getBook, getBooks, test } from '../controllers/book.controller.js';

const router = express.Router();

// POST /api/books - Create a new book
router.get('/test',test);


router.post('/', addBooks);



// GET /api/books - Retrieve a list of all books
router.get('/', getBooks);

// GET /api/books/:id - Retrieve details of a specific book by its ID
router.get('/:id', getBook);

// PUT /api/books/:id - Update a book's information by its ID
router.put('/:id', editBook);

// DELETE /api/books/:id - Delete a specific book by its ID
router.delete('/:id', deleteBook);

export default router;
