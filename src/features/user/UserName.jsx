import React from 'react';
import { useSelector } from 'react-redux';

const UserName = () => 
{
  const user = useSelector((store)=> store.user.username);
  if(!user)
  {
    return null;
  }
  
  return <div className="hidden text-sm font-semibold md:block">{user}</div>;
}

export default UserName;