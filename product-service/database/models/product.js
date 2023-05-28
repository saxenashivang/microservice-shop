const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    id: { type: String, require: true },
    name: {
      type: String,
      minlength: 2,
      maxlength: 128,
      required: true,
      index: true,
      trim: true,
    },
    price: { type: Number, require: true }, // consider in rupee
    description: { type: String, require: true },
    imageURI: { type: String, require: true },
    creator: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
