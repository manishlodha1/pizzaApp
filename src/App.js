import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Home from "./ui/Home"
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, { action as createOrderAction } from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from './ui/AppLayout';
import Error from "./ui/Error"

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<AppLayout/>} errorElement={<Error/>}>
    <Route path="/" element={<Home/>} />
    <Route path="/menu" element={<Menu/>} loader={menuLoader} errorElement={<Error/>}/>
    <Route path="/cart" element={<Cart/>} />
    <Route path="/order/new" element={<CreateOrder/>} action={createOrderAction} />
    <Route path="/order/:orderID" element={<Order/>} loader={orderLoader} errorElement={<Error/>} action={updateOrderAction} />
  </Route>
));



const App = () => 
{
  return (<RouterProvider router={router} />);
}

export default App;

