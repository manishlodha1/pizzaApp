import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] }; // { pizzaId, name, quantity, unitPrice, totalPrice }

const cartSlice = createSlice(
{
  name: "cart",
  initialState, 
  reducers:
  {
    addItem(state, action)
    {
        state.cart.push(action.payload);
    },

    deleteItem(state, action)
    {
        state.cart = state.cart.filter((item)=> item.pizzaId !== action.payload);
    },

    increaseItemQuantity(state, action)
    {
        const item = state.cart.find((item)=> item.pizzaId === action.payload);
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action)
    {
        const item = state.cart.find((item)=> item.pizzaId === action.payload);
        if(item.quantity === 1)
        {
            //state.cart = state.cart.filter((item)=> item.pizzaId !== action.payload);
            cartSlice.caseReducers.deleteItem(state, action);
            return;
        }
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
    },
    
    clearCart(state, action)
    {
        state.cart = [];
    }
    
  }
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (store)=> store.cart.cart;

export const getTotalCartQuantity = (store)=> store.cart.cart.reduce((sum, item)=> sum + item.quantity, 0);

export const getTotalCartPrice = (store)=> store.cart.cart.reduce((sum, item)=> sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id)=> (store)=> store.cart.cart.find((item)=> item.pizzaId === id)?.quantity ?? 0;