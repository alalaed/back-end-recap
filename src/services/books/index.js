import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
const booksRouter = express.Router();

const booksJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "books.json"
);

const getBooks = () => {
  return JSON.parse(fs.readFileSync(booksJSONPath));
};

const writeBooks = (content) =>
  fs.writeFileSync(booksJSONPath, JSON.stringify(content));

booksRouter.post("/", (req, res) => {
  const newBook = { ...req.body, createdAt: new Date(), id: uniqid() };
  const books = getBooks();
  books.push(newBook);
  writeBooks(books);
  res.status(201).send({ id: newBook.id });
});

booksRouter.get("/", (req, res) => {
  const books = getBooks();
  if (req.query && req.query.category) {
    const filteredBooks = books.filter((book) => book === req.query.category);
    res.send(filteredBooks);
  } else {
    res.send(books);
  }
});

booksRouter.get("/:bookId", (req, res) => {
  const books = getBooks();
  const foundBook = books.filter((book) => book.id === req.params.bookId);
  res.send(foundBook);
});

booksRouter.put("/:bookId", (req, res) => {
  const books = getBooks();
  const edited = books.findIndex((book) => book.id === req.params.bookId);
});

booksRouter.delete("/:bookId", (req, res) => {
  const books = getBooks();
  const remainingBooks = books.filter((book) => book.id !== req.params.bookId);
  writeBooks(remainingBooks);
  res.send(books);
});

export default booksRouter;
