const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose");


const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


const addProduct = [upload.single('image'), async (req, res) => {
  try {
    const { productName, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const firmId = req.params.firmId;
    const vendorId = req.vendorId;

    if (!productName || !price || !category || !image) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const firm = await Firm.findOne({ _id: firmId, vendor: vendorId });
    if (!firm) {
      return res.status(403).json({ error: "Unauthorized: Firm not found or doesn't belong to vendor." });
    }

    const product = new Product({
      productName,
      price: Number(price),
      category: category.split(','),
      image,
      firm: firm._id
    });

    const savedProduct = await product.save();

    firm.products = firm.products || [];
    firm.products.push(savedProduct._id);
    await firm.save();

    res.status(201).json({ message: "Product added successfully!", product: savedProduct });

  } catch (error) {
    console.error("Error occurred while adding product:", error);
    res.status(500).json({ error: "Internal server error", detail: error.message });
  }
}];


const getProductByFirm = async (req, res) => {
  const firmId = req.params.firmId;

  if (!mongoose.Types.ObjectId.isValid(firmId)) {
    return res.status(400).json({ error: "Invalid firm ID" });
  }

  try {
    const firm = await Firm.findById(firmId).populate("products");
    if (!firm) {
      return res.status(404).json({ error: "Firm not found" });
    }

    if (!firm.products.length) {
      return res.status(404).json({ message: "No products found for this firm" });
    }

    res.status(200).json({
      restaurantName: firm.firmName,
      products: firm.products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Firm.findByIdAndUpdate(product.firm, { $pull: { products: product._id } });

    if (product.image) {
      const imagePath = path.join(__dirname, '../uploads', product.image);
      fs.unlink(imagePath, err => {
        if (err) console.warn("Failed to delete image:", err);
      });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  addProduct,
  getProductByFirm,
  deleteProductById
};
