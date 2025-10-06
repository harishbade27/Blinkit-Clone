import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col justify-between h-full">
      <Link to={`/product/${product.id}`} className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto transform transition duration-300 hover:scale-105"
        />
        <h2 className="mt-2 font-semibold line-clamp-2">{product.title}</h2>
      </Link>

      <div className="flex items-center justify-between mt-3">
        <p className="text-green-600 font-bold">₹{product.price}</p>
        <button
          onClick={onAddToCart}
          className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700 transition transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
