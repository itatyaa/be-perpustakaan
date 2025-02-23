import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addBook = async (req, res) => {
  try {
    await createBook(req.body);
    res.json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editBook = async (req, res) => {
  try {
    await updateBook(req.params.id, req.body);
    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeBook = async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  