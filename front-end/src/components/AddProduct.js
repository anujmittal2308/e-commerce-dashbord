import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addhandal = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:9500/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",

        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    setname(result.name);
    setprice(result.price);
    setcategory(result.category);
    setcompany(result.company);
    navigate("/");
  };

  return (
    <div className="Register">
      <h1>AddProduct</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="enter product name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input ">Enter valid name</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="enter product price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input ">Enter valid price</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="enter product category"
        value={category}
        onChange={(e) => setcategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input ">Enter valid category</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="enter product company"
        value={company}
        onChange={(e) => setcompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalid-input ">Enter valid company</span>
      )}
      <button className="signup-button" onClick={addhandal}>
        Add
      </button>
    </div>
  );
};

export default AddProduct;
