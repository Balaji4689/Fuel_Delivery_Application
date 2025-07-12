


import React, { useState } from "react";
import { API_Path } from "../../../Helper/ApiPath"; 
import '../../dashboard.css'

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);



  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) 
        : [...prev, value]
    );
  };


  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setFile(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); 
    }
  };


  const handleAddProduct = async (e) => {
    e.preventDefault();


    try {

      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId"); 

      if (!productName.trim() || !price.trim() || category.length === 0 || !file) {
        alert("All fields (Product Name, Price, Category, and Image) are required!");

        return;
      }

      if (!loginToken) {
        console.error("Vendor not authenticated! Login token missing.");
        alert("Authentication error. Please log in again.");

        return;
      }

      if (!firmId) {
        console.error("Firm ID missing! Cannot add product without a firm.");
        alert("Firm not found. Please add a firm first or ensure a firm is selected.");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("image", file);
      formData.append("category", category.join(",")); 

      const response = await fetch(`${API_Path}/product/add-product/${firmId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`, 
        },
        body: formData, 
      });


      const data = await response.json();


      if (response.ok) { 
        alert("Product added successfully!");

        setProductName("");
        setPrice("");
        setCategory([]);
        setFile(null);
        setImagePreview(null);
       
      } else {
        console.error("Failed to add product:", data.message || "Unknown error");
        alert(data.message || "Failed to add product. Please try again.");
      }
    } catch (error) {

      console.error("Error occurred while adding product:", error);
      alert("An unexpected error occurred while adding the product. Please check console for details.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="FirmSection" style={{ color: "black" }}>
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3 style={{ color: "black" }}>Add Products</h3>
        <label style={{ color: "black" }}>Product Name</label>
        <input  type="text"  placeholder="Product Name" value={productName}  onChange={(e) => setProductName(e.target.value)}  required />

        <label style={{ color: "black" }}>Price</label>
        <input  type="number"   placeholder="Price"  value={price}  onChange={(e) => setPrice(e.target.value)}  required/>

        <div className="checkInp">
          <label style={{ color: "black" }}>Category</label>
          <div className="checkBokContainer">
            <label>Petrol</label>
            <input  type="checkbox"  value="Petrol"  checked={category.includes("Petrol")}  onChange={handleCategoryChange}/>
          </div>
          <div className="checkBokContainer">
            <label>Diesel</label>
            <input  type="checkbox"  value="Diesel"  checked={category.includes("Diesel")}  onChange={handleCategoryChange}/>
          </div>
        </div>

        <label style={{ color: "black" }}>Image</label>
        <input  type="file"  accept="image/*"   onChange={handleImageUpload}  required/>

        <div className="SubmitBut" style={{ marginTop: "15px" }}>
          <button type="submit" >Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

