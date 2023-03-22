import Paginator from "@/components/Paginator";
import ProfileLayout from "@/components/ProfileLayout";
import { getOrders } from "@/helper/order";
import React, { useState } from "react";

const OrderPage = ({orders}) => {

   const [pageNumber, setPageNumber] = useState(0);
   const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;
  

  return (
    <ProfileLayout>
      <div className='rounded-md border-2 p-4 shadow-sm'>
        <h1 className='mb-5 text-2xl font-bold text-black'>3 Orders</h1>
        <div className='grid grid-cols-4 gap-4 py-4'>
          <div className='font-medium uppercase text-gray-500'>ID</div>
          <div className='font-medium uppercase text-gray-500'>Amount Paid</div>
          <div className='font-medium uppercase text-gray-500'>Status</div>
          <div className='font-medium uppercase text-gray-500'>Action</div>
          {orders
            ?.slice(pagesVisited, pagesVisited + ordersPerPage)
            .map((order) => (
              <>
                <div className='text-sm' key={order._id}>
                  {order?._id}
                </div>
                <div className='text-sm'>{order?.price.toFixed(2)}</div>
                <div className='text-sm'>${order?.status}</div>
                <div className='flex items-center gap-3'>
                  <button className='flex h-7   w-7 cursor-pointer items-center justify-center rounded-md border-[1px] bg-orange-100 transition duration-200 hover:scale-110 active:scale-90'>
                    <CiEdit className='text-orange-800' />
                  </button>

                  <div
                    className='flex h-7   w-7 cursor-pointer items-center justify-center rounded-md border-[1px] bg-red-100 transition duration-200 hover:scale-110 active:scale-90'
                    onclick={() => deleteOrder(order?._id)}>
                    <BsTrash className='text-red-800' />
                  </div>
                </div>
              </>
            ))}
        </div>

        <Paginator
          data={orders}
          ordersPerPage={ordersPerPage}
          setPageNumber={setPageNumber}
        />
      </div>
    </ProfileLayout>
  );
};

export default OrderPage;


// export async function getServerSideProps() {
//   const orders = await getOrders();

//   return {
//     props: {
//       orders,
//     },
//   };
// }
