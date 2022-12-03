import mongoose from "mongoose";

import Base from "../Base";

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  qty: Number,
  price: Number,
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  ...Base
});

export default mongoose.model("OrderItem", OrderItemSchema);