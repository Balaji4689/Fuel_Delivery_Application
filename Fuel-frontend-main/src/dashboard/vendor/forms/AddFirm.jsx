import React, { useState } from "react";
import { API_Path } from "../../../Helper/ApiPath";
import '../../dashboard.css'

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [Area, setArea] = useState("");
  const [Category, setCategory] = useState([]);
  const [Offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setFile(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      const loginToken = localStorage.getItem("loginToken");

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", Area);
      formData.append("Offer", Offer);
      formData.append("image", file);
      formData.append("category", Category.join(","));

      const response = await fetch(`${API_Path}/firm/add-firm`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Response from backend:", data); 

      if (response.ok) {
        setFirmName("");
        setArea("");
        setCategory([]);
        setOffer("");
        setFile(null);
        setImagePreview(null);
        setSuccessMessage("Firm Added Successfully!");

        const firmId = data.firmId;
        console.log("Firm ID received:", firmId); 

        if (data.message==="vender can have only one firm "){
          alert("firm Exists . only one firm can added ")
        }
        if (firmId) { 
          localStorage.setItem('firmId', firmId);
          window.location.reload();
        } 
        else {
          console.warn("Firm ID not found in the response data.");
        }
      } 
    } catch (err) {
      console.error("Error submitting firm:", err);
    } finally {
    }
  };

  return (
    <div className="FirmSection" style={{ color: "black" }}>
      <form className="tableForm"  onSubmit={handleFirmSubmit}>
        <h3 style={{ color: "black" }}>Add Firm</h3>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <label style={{ color: "black" }}>Firm Name</label>
        <input  type="text"  placeholder="Firm Name"  value={firmName}  onChange={(e) => setFirmName(e.target.value)}/>

        <label style={{ color: "black" }}>Area</label>
        <input  type="text"  placeholder="Area"  value={Area}  onChange={(e) => setArea(e.target.value)}/>

        <div className="checkInp">
          <label style={{ color: "black" }}>Category</label>
          <div className="checkBokContainer">
            <label>Petrol</label>
            <input  type="checkbox"  value="Petrol"  checked={Category.includes("Petrol")}  onChange={handleCategoryChange}/>
          </div>
          <div className="checkBokContainer">
            <label>Diesel</label>
            <input  type="checkbox"  value="Diesel"  checked={Category.includes("Diesel")}  onChange={handleCategoryChange}/>
          </div>
        </div>
        <label style={{ color: "black" }}>Offer</label>
        <input  type="text"  placeholder="Offer"  value={Offer}  onChange={(e) => setOffer(e.target.value)}/>

        <label style={{ color: "black" }}>Image</label>
        <input type="file"  onChange={handleImageUpload} />
      
        <div className="SubmitBut" style={{ marginTop: "15px" }}>
          <button type="submit" >Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;