const mongoose = require("mongoose");

const Favorites = mongoose.model("Favorites", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: String,
  marvelId: String,
});

module.exports = Favorites;
