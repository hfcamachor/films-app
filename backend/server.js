const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = 8000;
const app = express();
app.use(cors());

const OMDB_URL = process.env.OMDB_URL;
const API_KEY = process.env.OMDB_API_KEY;

app.get("/films", async(req, res) => {
  const searchInput = req.query.search;
  try {
    const response = await fetch(`${OMDB_URL}/?s=${searchInput}${API_KEY}`);
    if(!response.ok) {
      res.send(response.statusText);
    }
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

app.get("/filmbytitle", async(req, res) => {
  const searchInput = req.query.search;
  try {
    const response = await fetch(`${OMDB_URL}/?i=${searchInput}${API_KEY}`);
    if(!response.ok) {
      res.send(response.statusText);
    }
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log("Listen on port 8000");
});
