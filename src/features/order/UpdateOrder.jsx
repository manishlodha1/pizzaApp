import React from 'react';
import Button from "../../ui/Button";
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

export const action = async ({ request, params })=>
{
  const data = { priority: true };
  await updateOrder(params.orderID, data);
  return null;
}

const UpdateOrder = ({ order }) => 
{

   const fetcher = useFetcher();
    
    return (
    <fetcher.Form method='PATCH' className='text-right'>
        <Button type="primary">Make priority</Button>
    </fetcher.Form>
  )
}

export default UpdateOrder;
