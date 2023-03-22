import Orders from '@/components/Orders';
import ProfileLayout from '@/components/ProfileLayout';
import React from 'react'

const orders = () => {
  return (
    <ProfileLayout>
      <div className='rounded-md border-[1px] p-3 shadow'>
        <h1 className='text-lg font-bold text-black'>Your Orders</h1>
        <div className='space-y-3'>
          <Orders />
          <Orders />
          <Orders />
        </div>
      </div>
    </ProfileLayout>
  );
}

export default orders