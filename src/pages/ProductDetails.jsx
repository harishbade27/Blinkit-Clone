import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);

    if (alreadyInCart) {
      setTooltip(true);
      setTimeout(() => setTooltip(false), 1500);
    } else {
      dispatch(addToCart(product));
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div
      className="relative p-6 flex flex-col md:flex-row gap-6 transform transition duration-700 ease-in-out"
      style={{ opacity: 0, animation: "fadeIn 0.7s forwards" }}
    >
      {tooltip && (
        <div className="absolute top-4 right-4 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg animate-slideIn">
          Already in Cart
        </div>
      )}

      <img
        src={product.image}
        alt={product.title}
        className="w-60 mx-auto transform transition duration-500 hover:scale-105"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-green-700 text-lg font-bold mb-4">₹{product.price}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white w-28 py-1 text-sm rounded hover:bg-green-700 transition transform hover:scale-105 self-start"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
