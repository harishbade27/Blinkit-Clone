import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [tooltip, setTooltip] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const showTooltip = (message) => {
    setTooltip(message);
    setTimeout(() => setTooltip(""), 1500);
  };

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);

    if (alreadyInCart) {
      showTooltip("Already in Cart");
    } else {
      dispatch(addToCart(product));
      showTooltip("Added to Cart");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 relative">
      <img
        src={product.image}
        alt={product.title}
        className="w-60 mx-auto transform transition duration-500 hover:scale-105"
      />
      <div className="flex-1 flex flex-col justify-between relative">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-green-700 text-lg font-bold mb-4">₹{product.price}</p>
        </div>

        <div className="relative inline-block">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700 transition transform hover:scale-105"
          >
            Add to Cart
          </button>

          {/* Tooltip */}
          {tooltip && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg opacity-100 scale-100 transition-all duration-300">
              {tooltip}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
