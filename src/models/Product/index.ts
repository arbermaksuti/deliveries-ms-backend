import mongoose from "mongoose";

import Base from "../Base";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  oldPrice: Number,
  category: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Category'
  },
  ...Base,
});

export default mongoose.model("Product", ProductSchema);
