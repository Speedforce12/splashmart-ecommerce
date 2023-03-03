import Image from "next/image";
import { bannerData } from "@/data/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const SlideCard = () => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // change this value to set the auto-slide duration in milliseconds
  });

  return (
    <>
      <Slider {...sliderSettings}>
        {bannerData.map((slide, index) => (
          <div
            className='lg:mt-.5 grid grid-cols-1 gap-5  bg-purple-200  p-5 lg:flex'
            key={index}>
            <div className='mt-5 w-3/5 justify-center'>
              <h1 className='lg:w-[390px] w-[350px] text-2xl font-bold lg:text-4xl'>
                {slide.title}
              </h1>
              <p className='my-4 w-96 whitespace-normal lg:w-[570px]'>
                {slide.desc}
              </p>
              <button className='rounded-md bg-teal-600 py-3 px-4 font-semibold duration-200 hover:bg-teal-400 hover:text-white'>
                Visit Collections
              </button>
            </div>
            <div className='place-content-center lg:ml-auto lg:h-80'>
              <Image
                src={slide.cover}
                alt=''
                width={300}
                height='300'
                className='h-52 w-52 object-cover lg:h-80 lg:w-80'
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SlideCard;
