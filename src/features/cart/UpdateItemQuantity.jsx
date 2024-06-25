import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { increaseItemQuantity, decreaseItemQuantity, getCurrentQuantityById } from './cartSlice';

const UpdateItemQuantity = ({ pizzaId }) => 
{
    const dispatch = useDispatch();

    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
    
    const handleIncreaseItemQuantity = () =>
    {
        dispatch(increaseItemQuantity(pizzaId));    
    }

    const handleDecreaseItemQuantity = () =>
    {
        dispatch(decreaseItemQuantity(pizzaId));    
    }

    return (
    <div className='flex gap-2 md:gap-3 items-center'>
      <Button type="round" onClick={handleDecreaseItemQuantity}>-</Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseItemQuantity}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity;
