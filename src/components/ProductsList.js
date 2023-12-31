import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5002/get-products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  console.log(products);

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5002/product/${id}`, {
      method: "Delete",
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    
    result = await result.json();
    if (result) {
      getProducts();
      alert("Selected Product is Deleted");
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5002/search/${key}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="products-list">
      <h3>Products list</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Products"
        onChange={searchHandle}
      />
      <ul>
        <li>SL.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h3>Product Not Found</h3>
      )}
    </div>
  );
};

export default ProductsList;
