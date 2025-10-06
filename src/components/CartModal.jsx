import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { BsX } from "react-icons/bs";

const CartModal = ({ isOpen, toggleCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleCart}
      ></div>
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white z-50 transform transition-transform duration-300 shadow-lg
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 relative flex flex-col h-full">
          <button
            onClick={toggleCart}
            className="absolute top-3 right-4 text-lg p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Close Cart"
          >
            <BsX size={30} />
          </button>
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="mt-6 text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3">
                  <img src={item.image} alt={item.title} className="h-12 w-12" />
                  <div className="flex-1 ml-3">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-green-600 text-sm">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 text-sm hover:underline transition"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <hr className="my-3" />
              <div className="flex justify-between font-semibold mb-4">
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
}

export default CartModal;