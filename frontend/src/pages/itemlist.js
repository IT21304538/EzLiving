import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // Import your CSS file

function itemlist() {
  const [items, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/items"); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (productName, productImage, productPrice) => {
    try {
      // Send a POST request to add the product to the cart
      await axios.post("http://localhost:5000/api/cart", {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: 1, // Set a default quantity (you can adjust this as needed)
      });

      console.log("Product added to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul className="product-list">
        {items.map((product) => (
          <li key={product._id} className="product-item">
            <img
              src={product.itemimage}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.itemname}</h2>
            <p className="product-description">{product.itemdescript}</p>
            <p className="product-price">Price: ${product.unitprice}</p>
            <button
              className="add-to-cart-button"
              onClick={() =>
                addToCart(product.name, product.imageUrl, product.price)
              }
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default itemlist;
