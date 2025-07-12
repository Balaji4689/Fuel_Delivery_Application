

const express = require("express");
const productController = require("../controllers/productController");
const verifyToken = require("../middleWares/verifyToken");

const path = require("path");

const router = express.Router();


router.post("/add-product/:firmId", verifyToken, ...productController.addProduct);


router.get("/:firmId/products", productController.getProductByFirm);


router.delete("/delete-product/:id", verifyToken, productController.deleteProductById);


router.get("/uploads/:imageName", (req, res) => {
  const imagePath = path.join(__dirname, "../uploads", req.params.imageName);
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(imagePath);
});

module.exports = router;
