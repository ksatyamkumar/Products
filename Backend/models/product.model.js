import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.index({
  updatedAt: -1,
  _id: -1,
});

productSchema.index({
  category: 1,
  updatedAt: -1,
  _id: -1,
});

export default mongoose.model("Product", productSchema);