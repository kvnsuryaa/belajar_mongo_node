require("dotenv").config();
require("./db")();

const express = require("express");
const cors    = require("cors");

const app     = express();
const PORT    = process.env.PORT || 9090;
const Book    = require("./models/Book");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

// Getting lis Book
app.get("/book", async (req, res) => {
  try {
    const all = await Book.find();
    res.send({ msg: "success", data: all });
  } catch (err) {
    res.send({ msg: "error", error: err });
  }
});

// Add Book
app.post("/book/add", async (req, res) => {
  let body = req.body;
  console.log("\nCreating new book");
  console.log(body);
  try {
    const add = new Book(body);
    const save = await add.save();
    res.send({ msg: "success", data: save });
  } catch (err) {
    res.send({ msg: "error", error: err });
  }
});

// Update Book
app.put("/book/update/:id", async (req, res) => {
  let body = req.body;
  let params = req.params;
  console.log(`update book ==> ${params.id}`);
  try {
    const update = await Book.updateOne({ _id: params.id }, { $set: body });
    res.send({ msg: "success", data: update });
  } catch (err) {
    res.send({ msg: "error", error: err });
  }
});

// Delete Book
app.delete("/book/delete/:id", async (req, res) => {
  let params = req.params;
  console.log(`delete book ==> ${params.id}`);
  try {
    const del = await Book.findByIdAndDelete({ _id: params.id });
    res.send({ msg: "success", data: del });
  } catch (err) {
    res.send({ msg: "error", error: err });
  }
});

app.listen(PORT, () => console.log(`Server listen at ${PORT}`));
