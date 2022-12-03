import mongoose from "mongoose";

import Base from "../Base";

const OrderSchema = new mongoose.Schema({
  description: String,
  status: {
    type: Number,
    enum: [0, 1, 2, 3],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  customerName: String,
  customerAddress: String,
  customerNumber: String,
  totalPrice: Number,
  ...Base
});

export default mongoose.model("Order", OrderSchema);
