import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5002/product/${params.id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateData = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5002/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "content-type": "Application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      },
    });
    result = await result.json();
    if (result) {
      Navigate("/");
    }
  };
  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />

      <input
        type="text"
        className="input-box"
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />

      <button className="appButton" onClick={updateData}>
        UpDate Product
      </button>
    </div>
  );
};

export default UpdateProduct;
