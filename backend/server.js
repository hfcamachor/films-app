const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = 8000;
const app = express();
app.use(cors());

const OMDB_URL = process.env.OMDB_URL;
const API_KEY = process.env.OMDB_API_KEY;

app.get("/films", async (req, res) => {
  const searchInput = req.query.search;
  try {
    const response = await fetch(`${OMDB_URL}/?s=${searchInput}${API_KEY}`);
    if (!response.ok) {
      res.send(response.statusText);
    }
    const data = await response.json();
    if (!data.Search) {
      res.status(404).send("No films found");
      return;
    }
    const filmsWithPoster = data.Search.filter((film) => film.Poster);

    res.send(filmsWithPoster);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/filmbytitle", async (req, res) => {
  const searchInput = req.query.search;
  try {
    const response = await fetch(`${OMDB_URL}/?i=${searchInput}${API_KEY}`);
    if (!response.ok) {
      res.send(response.statusText);
    }
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Listen on port 8000");
});
