import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
            <button
            disabled
            type='button'
            key={index}
            className={` ${index <= (hover || rating) ? "text-orange-600" : "text-black/50"} text-lg `}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>
            <span className='star'>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
