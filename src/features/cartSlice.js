import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("cart_items");
const initialState = {
  items: saved ? JSON.parse(saved) : []
};

const findIndex = (items, id) => items.findIndex(i => i.id === id);

const save = (items) => {
  localStorage.setItem("cart_items", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const idx = findIndex(state.items, product.id);
      if (idx === -1) {
        state.items.push({ ...product, qty: 1 });
      } else {
        // If duplicate, keep qty same
      }
      save(state.items);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
      save(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      save(state.items);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const idx = findIndex(state.items, id);
      if (idx !== -1) {
        state.items[idx].qty += 1;
      }
      save(state.items);
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const idx = findIndex(state.items, id);
      if (idx !== -1 && state.items[idx].qty > 1) {
        state.items[idx].qty -= 1;
      }
      save(state.items);
    }
  }
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
