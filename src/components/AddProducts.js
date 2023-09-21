import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5002/add-products", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  
  return (
    <div className="product">
      <h1>Add products</h1>
      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="inavalid-input">Enter valid Name</span>
      )}
      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="inavalid-input">Enter valid Price</span>
      )}

      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="inavalid-input">Enter valid Category</span>
      )}

      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="inavalid-input">Enter valid Company</span>
      )}

      <button className="appButton" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
