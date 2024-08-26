import Book from '../models/Book.js';


export const test=(req,res)=>{
    res.json({
        message:"api is working",
    });
};


/**
 * 
 * Add the new book with title,author,isbn,publishedDate in request body
 */
export const addBooks=async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;

        if (!title || !author || !isbn) {
            return res.status(400).json({ message: 'Title, author, and ISBN are required.' });
        }

        const newBook = new Book({ title, author, isbn, publishedDate });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
}



// API Endpoint: /api/books

/**
 * Retrieves a list of books based on the provided query parameters.
 *
 * @param {number} limit - The number of books to return per page (default: 10).
 * @param {number} skip - The number of books to skip before returning the results (default: 0).
 * @param {string} search - A search query to filter the results (optional).
 * @param {string} sortBy - The field to sort the results by (optional).
 * @param {string} order - The sorting order (either asc for ascending or desc for descending, default: asc).
 * @returns {Promise<Book[]>} A promise that resolves to an array of book objects.
 */
export const getBooks=async(req,res)=>{
    try {
        const { limit = 10, skip = 0, search, sortBy = 'publishedDate', order = 'desc' } = req.query;

        // Convert limit and skip to numbers
        const limitNum = parseInt(limit);
        const skipNum = parseInt(skip);

        // Build the search query
        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } }, 
                    { author: { $regex: search, $options: 'i' } } 
                ]
            };
        }

        // Build the sort object
        let sortOrder = {};
        sortOrder[sortBy] = order === 'desc' ? -1 : 1;

        // Find books with pagination, search, and sorting
        const books = await Book.find(query)
            .sort(sortOrder)
            .limit(limitNum)
            .skip(skipNum);

        // Optionally, return the total count of books that match the query
        const totalBooks = await Book.countDocuments(query);

        res.status(200).json({
            totalBooks,
            books
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error });
    }
}



/**
 * 
 * edit the book with given isbn
 */
export const editBook = async (req, res) => {
    try {
        const { title, author, publishedDate } = req.body;
        const updatedBook = await Book.findOneAndUpdate(
            { isbn: req.params.id },
            { title, author, publishedDate },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
}



/**
 * 
 * Get the book with given isbn
 */
export const getBook = async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.id });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error });
    }
}


export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ isbn: req.params.id });

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
}
