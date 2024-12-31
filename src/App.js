import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";


function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
     
    fetch("http://localhost:3000/api/product/list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responseData && Array.isArray(data.responseData)) {
          setProducts(data.responseData);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 mr-7">
      <h1 className="text-5xl font-semibold text-center ml-6 text-stone-950 underline mb-4">
        Product List
      </h1>
      <div className="space-y-4">
        {error ? (
          <p className="text-neutral-800">{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.product_id}
              className= "  p-5  bg-black gap-y-4 mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4 underline ">
                {product.name}
              </h3>
              <div className="grid grid-cols-2 gap-x-0 gap-y-8 text-white">
                      <p className="font-medium">Product ID:</p>
                      <p>{product.product_id}</p>
                      <p className="font-medium">Description:</p>
                      <p>{product.description}</p>
                      <p className="font-medium">Brand:</p>
                      <p>{product.brand}</p>
                      <p className="font-medium">Price:</p>
                      <p>${product.price}</p>
                      <p className="font-medium">Category:</p>
                      <p>{product.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 mt-9">No products available.</p>
        )}
      </div>
    </div>
  );
}

export default App;

