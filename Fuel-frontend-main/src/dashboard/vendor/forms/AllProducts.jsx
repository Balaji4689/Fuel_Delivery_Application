

import React, { useState, useEffect } from 'react';
import { API_Path } from '../../../Helper/ApiPath';
import '../../dashboard.css'

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_Path}/product/${firmId}/products`);
      const data = await response.json();
      console.log("API response:", data);

      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } 

    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    console.log("Fetching products...");
    fetchProducts();
  }, []);

  const deleteProductById =async(productId)=>{
    try {
       const response = await fetch(`${API_Path}/product/delete-product/${productId}` ,{
        method : 'DELETE' ,

       })
       if (response.ok){
        setProducts(products.filter(product=>product._id  !== productId));
        confirm("are you sure ? you want to delete ?")
        alert("product deleted succssfully !!")
       }
    } catch (error) {
      console.error("failed to delete product !!");
      alert ("failed to delete product !!")
    }
  }
  return (
    <div className='AllProducts '>
      {products.length === 0 ? (
        <h1>No products have been added . !!!!</h1>
      ) : (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image ? (
                    <img  src={`${API_Path}/uploads/${item.image}`}  alt={item.productName}  width="130" />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;

