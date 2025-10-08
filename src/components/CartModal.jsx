import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, increaseQty, decreaseQty } from "../features/cartSlice";
import { BsX } from "react-icons/bs";

const CartModal = ({ isOpen, toggleCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const theme = useSelector((state) => state.theme.mode);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleCart}
      ></div>

      <div
        className={`fixed top-0 right-0 w-80 h-full z-50 transform transition-transform duration-300 shadow-lg ${isOpen ? "translate-x-0" : "translate-x-full"
          } ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <div className="p-4 relative flex flex-col h-full">
          <button
            onClick={toggleCart}
            className="absolute top-3 right-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Close"
          >
            <BsX size={22} />
          </button>

          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {cart.length === 0 ? (
            <p className="mt-6 text-gray-500 dark:text-gray-400">Your cart is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-green-600 text-sm">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-green-700 transition"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.qty}</span>
                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-green-700 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-between font-semibold my-3">
                <p>Total:</p>
                <p>₹{total.toFixed(2)}</p>
              </div>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
