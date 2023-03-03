import { ServiceData } from '@/data/data';
import React from 'react'

const ServiceCard = () => {
  return (
    <div className=' mt-16 p-3 flex  items-center gap-6  justify-center overflow-x-auto'>
      {ServiceData.map((service) => (
        <div className='flex lg:h-28 lg:w-72 h-20 hover:bg-purple-100 shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer items-center rounded-md bg-white  p-2'>
              <div className=' mx-3 flex items-center justify-center p-3 rounded-full bg-blue-900 text-white'>{service.cover}</div>
              <div className='flex flex-col space-y-2'>
                  <h3 className='text-sm font-semibold'>{service.title}</h3>
                  <p className='text-xs hidden lg:block'>{service.decs }</p>
              </div>
          </div>
          
      ))}
    </div>
  );
}

export default ServiceCard