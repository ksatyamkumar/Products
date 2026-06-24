import dotenv from "dotenv";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import connectDB from "../utils/db.js";

import Product from "../models/product.model.js";
import { categories } from "../constants/catagories.js";

dotenv.config();

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const generateProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const createdDate = faker.date.past();

    products.push({
      name: faker.commerce.productName(),

      category:
        categories[
          Math.floor(Math.random() * categories.length)
        ],

      price: Number(
        faker.commerce.price({
          min: 100,
          max: 100000,
        })
      ),

      createdAt: createdDate,
      updatedAt: faker.date.between({
        from: createdDate,
        to: new Date(),
      }),
    });
  }

  return products;
};

const seedProducts = async () => {
  try {
    await connectDB();

    console.log("Deleting old products...");

    await Product.deleteMany({});

    console.log("Starting insert...");

    const batches = TOTAL_PRODUCTS / BATCH_SIZE;

    for (let batch = 0; batch < batches; batch++) {
      const products = generateProducts(
        BATCH_SIZE
      );

      await Product.insertMany(products);

      console.log(
        `Batch ${batch + 1}/${batches} inserted`
      );
    }

    console.log(
      `Successfully inserted ${TOTAL_PRODUCTS} products`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedProducts();