const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Favorites = require("../models/Favorites");

router.post("/favorite", async (req, res) => {
  try {
    console.log(req.body);

    const user = await User.findOne({ token: req.body.token });

    console.log(user);

    const newFavorites = new Favorites({
      user: user,
      type: req.body.type,
      marvelId: req.body.marvelId,
    });
    await newFavorites.save();
    console.log(newFavorites);
    return res.status(201).json(newFavorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/favorite/:id", async (req, res) => {
  try {
    console.log("bien recu");
    console.log(req.params.id);

    await Favorites.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/favorite/check", async (req, res) => {
  const { userToken, marvelId } = req.query;
  console.log(userToken, " | ", marvelId);

  try {
    const user = await User.findOne({ token: userToken });
    console.log(user);
    const favorite = await Favorites.findOne({
      user: user,
      marvelId: marvelId,
    });
    console.log(favorite);
    if (favorite) {
      return res
        .status(200)
        .json({ isFavorite: true, favoriteId: favorite._id });
    } else {
      return res.status(200).json({ isFavorite: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/favorites/:token", async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    console.log(user);

    const response = await Favorites.find({ user: user });
    console.log(response);

    if (response.length === 0) {
      return res.status(200).json([{ exist: false }]);
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
