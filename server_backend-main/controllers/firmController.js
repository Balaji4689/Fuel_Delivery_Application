const mongoose = require("mongoose");
const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, Offer, category } = req.body;
    const vendorId = req.vendorId;
    const image = req.file ? req.file.filename : null;

    console.log("Incoming Request Body:", req.body);
    console.log("Image File:", req.file);

    if (!firmName || !area || !Offer || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingFirm = await Firm.findOne({ vendor: vendorId });
    if (existingFirm) {
      return res.status(409).json({ message: "Vendor can have only one firm" });
    }

    const newFirm = new Firm({
      firmName,
      area,
      offer: Offer,
      category: category.split(","),
      image,
      vendor: vendorId,
    });

    const savedFirm = await newFirm.save();
    await Vendor.findByIdAndUpdate(vendorId, { firm: savedFirm._id });

    return res.status(201).json({
      message: "Firm Added Successfully!",
      firmId: savedFirm._id,
    });
  } catch (error) {
    console.error("Error in addFirm:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.id;

    const deletedFirm = await Firm.findByIdAndDelete(firmId);
    if (!deletedFirm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    await Vendor.findByIdAndUpdate(
      deletedFirm.vendor,
      { $pull: { firm: firmId } },
      { new: true }
    );

    if (deletedFirm.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', deletedFirm.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
        else console.log("Image file deleted successfully:", imagePath);
      });
    }

    res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error("Error deleting firm:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addFirm: [upload.single("image"), addFirm],
  deleteFirmById,
};
