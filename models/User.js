const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // it generate id by default
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    // timestamp which will print created at and updated at
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
