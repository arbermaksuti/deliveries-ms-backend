import mongoose from "mongoose";

const BaseSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
    default: null,
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

export default BaseSchema.obj;
