import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { BsMoon, BsSun, BsCart3 } from "react-icons/bs";

const Navbar = ({ toggleCart, onSearch }) => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <nav
      className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-green-600 text-white"
        } sticky top-0 z-50 p-4 shadow-md transition-colors duration-500`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ease-in-out">
        <div className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="text-2xl font-bold flex-shrink-0 hover:scale-105 transform transition-transform duration-300"
          >
            Blinkit Clone
          </Link>
          <div className="hidden md:flex flex-1 justify-center mx-4 transition-all duration-500">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 transition-all duration-500">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-110 transition-transform duration-300"
              title="Toggle Dark Mode"
            >
              {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-110 transition-transform duration-300"
            >
              <BsCart3 size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden flex justify-center mt-3 transition-all duration-500">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
