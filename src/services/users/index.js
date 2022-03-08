import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const currentFileName = import.meta.url;
const currentFilePath = fileURLToPath(currentFileName);
const parentFolderPath = dirname(currentFilePath);
const usersJSONPath = join(parentFolderPath, "users.json");

const usersRouter = express.Router();

// CRUD 1. POST
usersRouter.post("/", (req, res) => {
  const newUser = { ...req.body, createdAt: new Date(), id: uniqid() };
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath));
  usersArray.push(newUser);
  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray));

  res.status(201).send({ id: newUser.id });
});

// CRUD 2. GET
usersRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(usersJSONPath);
  const usersArray = JSON.parse(fileContent);
  console.log(usersArray);
  res.send({ usersArray });
});

// CRUD 3. GET with ID
usersRouter.get("/:userId", (req, res) => {
  const currentFile2 = import.meta.url;
  const currentFile2Path = fileURLToPath(currentFile2);
  const parentFolder2 = dirname(currentFile2Path);
  const joining = join(parentFolder2, "./users.json");

  const fileContent = fs.readFileSync(joining);
  const usersArray = JSON.parse(fileContent);
  const foundUser = usersArray.find((user) => user.id === req.params.userId);
  res.send({ foundUser });
});

// CRUD 4. PUT with ID
usersRouter.put("/:userId", (req, res) => {
  const arr = JSON.parse(
    fs.readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "/users.json")
    )
  );
  const index = arr.findIndex((user) => user.id === req.params.userId);
  const oldUser = arr[index];
  const updatedUser = { ...oldUser, ...req.body, updatedAt: new Date() };
  arr[index] = updatedUser;
  fs.writeFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "/users.json"),
    JSON.stringify(arr)
  );
  res.send(updatedUser);
});

// CRUD 5. DEL with ID
usersRouter.delete("/:userId", (req, res) => {
  const pathToBeRead = JSON.parse(
    fs.readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "/users.json")
    )
  );
  const arrayFiltered = pathToBeRead.filter(
    (user) => user.id !== req.params.userId
  );
  fs.writeFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "/users.json"),
    JSON.stringify(arrayFiltered)
  );
  res.status(204).send();
});

export default usersRouter;
