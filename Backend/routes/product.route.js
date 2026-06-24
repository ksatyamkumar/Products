
import express from "express";

import {
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.route("/hi").get(()=> {console.log("hello world");
})

export default router;