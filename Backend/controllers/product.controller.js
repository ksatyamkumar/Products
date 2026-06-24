import mongoose from "mongoose";
import Product from "../models/product.model.js";
import AppError from "../utils/AppError.js";

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      cursorUpdatedAt,
      cursorId,
      limit = process.env.DEFAULT_PAGE_SIZE,
    } = req.query;

    // Validate limit
    const parsedLimit = Number(limit);

    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
      return next(new AppError("Limit must be between 1 and 100", 400));
    }

    // Validate cursorId
    if (cursorId && !mongoose.Types.ObjectId.isValid(cursorId)) {
      return next(AppError("Invalid cursorId", 400));
    }

    const query = {};

    // Category filter
    if (category) {
      query.category = category;
    }

    // Cursor pagination
    if (cursorUpdatedAt && cursorId) {
      query.$or = [
        {
          updatedAt: {
            $lt: new Date(cursorUpdatedAt),
          },
        },
        {
          updatedAt: new Date(cursorUpdatedAt),
          _id: {
            $lt: cursorId,
          },
        },
      ];
    }

    const products = await Product.find(query)
      .select("_id name category price createdAt updatedAt")
      .sort({
        updatedAt: -1,
        _id: -1,
      })
      .limit(parsedLimit)
      .lean();

    // Generate next cursor
    const lastProduct =
      products.length > 0 ? products[products.length - 1] : null;

    const nextCursor = lastProduct
      ? {
          updatedAt: lastProduct.updatedAt,
          id: lastProduct._id,
        }
      : null;

    return res.status(200).json({
      success: true,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    next(error);
  }
};
