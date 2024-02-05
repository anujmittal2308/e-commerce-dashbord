import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateComponent = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:9500/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setname(result.name);
    setprice(result.price);
    setcategory(result.category);
    setcompany(result.company);
    console.warn(result);
  };
  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:9500/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-type": "Application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="Register">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="enter product name"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter product price"
        value={price}
        onChange={(e) => {
          setprice(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter product category"
        value={category}
        onChange={(e) => {
          setcategory(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter product company"
        value={company}
        onChange={(e) => {
          setcompany(e.target.value);
        }}
      />

      <button className="signup-button" onClick={updateProduct}>
        UpDate Product
      </button>
    </div>
  );
};

export default UpdateComponent;
