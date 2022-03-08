import express from "express";
import listEndpoints from "express-list-endpoints";
import booksRouter from "./services/books/index.js";
import usersRouter from "./services/users/index.js";

const server = express();

const port = 3001;

server.use(express.json());

server.use("/users", usersRouter);
server.use("/books", booksRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server is running on port " + port);
});
