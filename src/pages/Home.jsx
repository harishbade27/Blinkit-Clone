import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState("");
  const theme = useSelector((state) => state.theme.mode);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);
    if (alreadyInCart) {
      setTooltip("Already in Cart");
    } else {
      dispatch(addToCart(product));
      setTooltip("Added to Cart");
    }
    // Hide tooltip after 1.5s
    setTimeout(() => setTooltip(""), 1500);
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-64 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"}`}>
      <Banner />

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg transition-all duration-300 transform scale-105 z-50">
          {tooltip}
        </div>
      )}

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {filtered.map((product, index) => (
          <div
            key={product.id}
            className="transform transition duration-500 ease-in-out hover:scale-105"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease forwards`,
              animationDelay: `${index * 100}ms`,
            }}
          >
            <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-10 text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Home;
