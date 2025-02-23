import database from "../config/database.js";

export const getBooks = () => {
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM books", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const getBookById = (id) => {
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]); // Ambil satu data
    });
  });
};

export const createBook = (book) => {
  return new Promise((resolve, reject) => {
    database.query("INSERT INTO books SET ?", book, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const updateBook = (id, book) => {
  return new Promise((resolve, reject) => {
    database.query("UPDATE books SET ? WHERE id = ?", [book, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    database.query("DELETE FROM books WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
