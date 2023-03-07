import CartItem from "@/components/CartItem";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import emptyCart from "../public/images/emptyCart.png";

const cart = () => {
  const { cartmart } = useSelector((state) => state.cartmart);
  // get grand total price of all items
  const getTotal = () => {
    return cartmart
      .reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      )
      .toFixed(2);
  };
  const tax = Number(getTotal() * 0.1);
  const getTotalQuantity = () => {
    return cartmart.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
  };

  return (
    <div className=' mt-12'>
      <div className='h-16 w-full rounded-sm bg-blue-100 p-5'>
        <h1 className='ml-10 text-2xl font-bold tracking-wide'>
          {getTotalQuantity() || 0} Item(s) in Cart
        </h1>
      </div>
      <div className='mx-auto mt-7 grid w-full  max-w-7xl grid-cols-1 items-center justify-center gap-5 rounded-md lg:flex'>
        {cartmart.length === 0 ? (
          <div className='flex flex-col items-center justify-center'>
            <Image
              src={emptyCart}
              alt='empty cart'
              className='w-[500px] object-cover'
            />

            <h2 className='text-lg font-semibold'>
              It lonely in here, please add some items to make me happy 😉
            </h2>

            <div className='mt-3 flex items-center justify-center'>
              <Link
                href='/'
                className='rounded-md bg-blue-800 py-3 px-2 font-semibold text-white hover:bg-blue-500 hover:text-white'>
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className='flex flex-1 flex-col rounded-sm border-[1px] p-3 shadow-md'>
              <div className='h-[410px] space-y-3 overflow-y-auto scroll-smooth p-3'>
                {cartmart.map((product) => (
                  <CartItem item={product} />
                ))}
              </div>
            </div>

            {/* price summary */}
            <div className='sticky ml-auto flex h-80 w-96 flex-col rounded-sm border-[1px] p-5 shadow-md'>
              <div className='space-y-3 border-b-[1px] '>
                <div className='flex items-center justify-between'>
                  <span className='text-base font-medium'>
                    Amount before tax:
                  </span>
                  <p className='font-semibold text-black/75'>
                    ${getTotal() || 0}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-base font-medium'>Total Units:</span>
                  <p className='font-medium text-green-400'>
                    {getTotalQuantity() || 0} (Units)
                  </p>
                </div>
                <div className='flex items-center justify-between pb-3'>
                  <span className='text-base font-medium'>Tax:</span>
                  <p className='font-semibold text-black/75'>${tax.toFixed(2)}</p>
                </div>
              </div>
              <div className='mt-3 flex w-full flex-col gap-3'>
                <span className='flex items-center justify-between text-xl font-bold'>
                  Total price: <p>${parseFloat(Number(getTotal()) + tax)}</p>
                </span>
                <button className='bg- rounded-md bg-gradient-to-tr  from-green-500 to-green-700 py-3 px-2 font-bold text-white hover:bg-green-600 hover:bg-gradient-to-br active:scale-95'>
                  Continue
                </button>
                <button className='rounded-md border-2 py-3 px-2 font-bold text-green-600 transition duration-200 hover:bg-green-400 hover:text-white   active:scale-95'>
                  Back to shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default cart;
