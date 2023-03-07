import React from "react";
import StarRatings from "react-star-ratings";

const Reviews = () => {
  return (
    <div className='h-32 w-72 rounded-md bg-white p-3 shadow-md'>
      <div className='flex w-full flex-col p-2 justify-center'>
        <div className='flex items-center gap-4'>
          <img src='/images/avatar.png' width={30} height={30} />

          <div className='grid '>
            <h3 className='text-sm font-bold text-black'>O'vonee Delpesche</h3>
            <span className='text-xs font-semibold text-gray-400'>
              Posted on: 2023-01-14
            </span>
          </div>
        </div>
        <div className='grid space-y-1'>
          <div className='flex items-center gap-3'>
            <StarRatings
              rating={4.5}
              starRatedColor='#ffb829'
              numberOfStars={5}
              starDimension='12px'
              starSpacing='2px'
              name='rating'
            />
            <p className='text-xs text-[#ffb829]'>4.5</p>
          </div>

          <p className='text-sm text-gray-400 '>Yes it was very good</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
