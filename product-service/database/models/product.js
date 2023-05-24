const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    id: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    imageURL: { type: String, require: true },
    creator: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
