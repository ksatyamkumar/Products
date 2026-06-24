import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import errorHandler from "./middlewares/err.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());
// connectDB()

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Product Browser API",
    endpoints: {
      products: "/api/products",
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "UP",
    timestamp: new Date(),
  });
});

app.use(
  "/api/products",
  productRoutes
);

app.use(errorHandler);


export default app;


// started doing step 6 but not getting op in postman as per requireds