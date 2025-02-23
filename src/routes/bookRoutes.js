import express from "express";
import {
  getAllBooks,
  getSingleBook,
  addBook,
  editBook,
  removeBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getSingleBook);
router.post("/books", addBook);
router.put("/books/:id", editBook);
router.delete("/books/:id", removeBook);

export default router;
