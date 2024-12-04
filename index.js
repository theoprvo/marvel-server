require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);

//ROUTES
app.get("/", (req, res) => {
  res.json("Welcome to MARVEL API");
});

const userRoutes = require("./routes/user");
const favoritesRoutes = require("./routes/favorites");
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
app.use(userRoutes);
app.use(favoritesRoutes);
app.use(charactersRoutes);
app.use(comicsRoutes);

//SERVER START
app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
