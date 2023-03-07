import { FcGoogle } from "react-icons/fc";
import { AiOutlineApple } from "react-icons/ai"

const Footer = () => {
  return (
    <>
      <footer>
        <div className=' mt-16 grid w-full grid-cols-1 bg-blue-900 p-10 lg:grid-cols-4 '>
          <div className='p-3'>
            <h2 className='mb-3 flex items-center px-2 text-xl font-bold text-indigo-500 sm:text-2xl'>
              Splash<p className='text-teal-500'>Mart</p>
            </h2>
            <p className='text-sm font-medium text-white/60'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </p>
            <div className='mt-5 flex items-center gap-3'>
              <div className='flex cursor-pointer items-center justify-between gap-1 rounded-md bg-white px-2 py-3'>
                <FcGoogle className='h-7 w-7' />
                <span className='whitespace-nowrap text-sm font-medium lg:text-base'>
                  Google Play
                </span>
              </div>
              <div className='flex cursor-pointer items-center justify-between gap-1 rounded-md bg-white px-2 py-3'>
                <AiOutlineApple className='h-7 w-7' />
                <span className='whitespace-nowrap text-sm font-medium lg:text-base'>
                  App Store
                </span>
              </div>
            </div>
          </div>

          <div className='mt-3'>
            <h2 className='mb-5 text-lg font-semibold text-white'>About Us</h2>
            <ul className='space-y-2 text-white/60'>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='mt-5'>
            <h2 className='mb-5 text-lg font-semibold text-white'>
              Customer Care
            </h2>
            <ul className='space-y-2 text-white/60'>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div className='mt-5'>
            <h2 className='mb-5 text-lg font-semibold text-white'>
              Contact Us
            </h2>
            <ul className='space-y-2 text-white/60'>
              <li>
                70 Washington Square South, New York, NY 10012, United States{" "}
              </li>
              <li>Email: uilib.help@gmail.com</li>
              <li>Phone: +1 1123 456 780</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
