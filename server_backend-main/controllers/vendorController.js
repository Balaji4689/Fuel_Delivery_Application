const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/Vendor");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.WhatIsYourName;

// Vendor Registration
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Received Data:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully!" });
    console.log("Vendor registered successfully!");

  } catch (error) {
    console.error("Error during vendor registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "12h" });

    res.status(200).json({
      message: "Login successful!",
      token,
      vendor: {
        username: vendor.username,
        id: vendor._id,
      },
    });

    console.log("Generated Token:", token);

  } catch (error) {
    console.error("Error during vendor login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllVendor = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    res.status(200).json({ vendors });
  } catch (error) {
    console.error("Error fetching all vendors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getVenderById = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error in getVenderById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const uploadProfilePhoto = async (req, res) => {
  try {
    const vendorId = req.body.vendorId;
    const imagePath = `/uploads/${req.file.filename}`;

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { photo: imagePath },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      success: "Profile photo uploaded successfully",
      photo: imagePath,
      vendor,
    });

  } catch (error) {
    console.error("Profile upload error:", error);
    res.status(500).json({ error: "Internal server error", detail: error.message });
  }
};


module.exports = {
  vendorRegister,
  vendorLogin,
  uploadProfilePhoto,
  getAllVendor,
  getVenderById,
};
