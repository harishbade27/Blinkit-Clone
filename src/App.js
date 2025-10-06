import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleCart = () => setCartOpen(!cartOpen);
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white min-h-screen" : "bg-white min-h-screen"}>
      <BrowserRouter>
        <Navbar toggleCart={toggleCart} onSearch={setSearchTerm} />
        <CartModal isOpen={cartOpen} toggleCart={toggleCart} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
