import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import MenuItem from "./MenuItem";

export const loader = async()=>
{
  const data =   await getMenu();
  return data;
}


const Menu = ()=> 
{
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}


export default Menu;
