import mongoose from "mongoose";

import Base from "../Base";

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  ...Base
});

export default mongoose.model("Category", CategorySchema);