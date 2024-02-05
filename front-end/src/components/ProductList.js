import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    let result = await fetch("http://localhost:9500/product", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProdut = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:9500/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getproduct();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:9500/search/${key}` , {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
      );
      result = await result.json();
      if (result) {
        setProducts(result); // set product
      }
    } else {
      getproduct();
    }
  };

  console.warn(products);
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>s.no</li>
        <li>name</li>
        <li>Prince</li>
        <li>category</li>
        <li>company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map(
          (
            item,
            index 
          ) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li>
                <button onClick={() => deleteProdut(item._id)}> DELETE</button>
                <Link to={"/update/" + item._id}>
                  {" "}
                  <button>UpDate</button>
                </Link>
              </li>
            </ul>
          )
        )
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
