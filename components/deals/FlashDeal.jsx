import { flashData } from "@/data/data";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TiFlash } from "react-icons/ti";
import ProductCard from "./ProductCard";

const FlashDeal = () => {
  const scrollLeft = () => {
    document.getElementById("flash").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("flash").scrollLeft += 400;
  };

  return (
    <div className=' mt-10'>
      <div className='relative flex items-center'>
        <TiFlash className='h-6 w-8 text-rose-600' />
        <h2 className='text-2xl font-bold '>Flash Deals</h2>
        <div className='ml-auto'>
          {/* prev arrow */}
          <button onClick={scrollLeft} className=' hover:text-purple-400 '>
            <FiChevronLeft className='h-8 w-8' />
          </button>

          {/* next arrow */}
          <button
            onClick={scrollRight}
            className='transition-colors duration-200 hover:text-purple-400'>
            <FiChevronRight className='h-8 w-8' />
          </button>
        </div>
      </div>

      <div
        className='mt-1 snap-x overflow-x-auto scroll-smooth pl-4 scrollbar-hide'
        id='flash'>
        <div className='flex snap-mandatory gap-5'>
          {flashData.map((flash) => (
            <div>
              <ProductCard flash={ flash} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashDeal;
