import Book from '../models/Book.js';


export const test=(req,res)=>{
    res.json({
        message:"api is working",
    });
};


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


export const editBook=async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, isbn, publishedDate }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
}

export const getBook=async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error });
    }
}

export const deleteBook=async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
}