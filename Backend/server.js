import app from "./app.js";
import connectDB from "./utils/db.js";
import dotenv from "dotenv"
import Product from "./models/product.model.js";
dotenv.config();

// console.log(Product.modelName)

connectDB()
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});