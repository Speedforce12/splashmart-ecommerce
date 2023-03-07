import { NewArrivalData } from "@/data/data";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NewCard from "./NewCard";

const NewArrival = () => {
  const scrollLeft = () => {
    document.getElementById("new").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("new").scrollLeft += 400;
  };

  return (
    <div className='mt-5'>
      <div className='flex'>
        <img
          src='https://img.icons8.com/glyph-neue/64/26e07f/new.png'
          className='w-10 -rotate-12'
        />
        <h2 className='text-2xl font-bold '>New Arrivals</h2>
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
        className='mt-2 snap-x overflow-x-auto scroll-smooth pl-4 scrollbar-hide'
        id='new'>
        <div className='flex snap-mandatory gap-5'>
          {NewArrivalData.map((item) => (
            <div>
              <NewCard item={item} key={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
