import mongoose from "mongoose";

import Base from "../Base";

const LocationSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  ...Base
});

export default mongoose.model("Location", LocationSchema);
