import StarRating from "@/components/StarRating";
import { getProduct } from "@/helper/product";
import Image from "next/image";
import { defaultImage } from "../../public/images/default_product.png";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import { useRef } from "react";
import Reviews from "@/components/Reviews";
import {BsCart4} from "react-icons/bs"

const productDetail = ({ product }) => {
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const setImgPreview = (url) => {
    imgRef.current.src = url;
  };

  return (
    <div className='mx-auto mt-10 w-full max-w-7xl p-3'>
      <div className='grid grid-cols-1 gap-8 p-2 md:grid-cols-2'>
        <aside className='grid grid-cols-1'>
          <div className='flex items-center justify-center border-[1px] p-3 shadow-sm'>
            <img
              ref={imgRef}
              alt={product.name}
              src={
                product?.images[0]
                  ? product?.images[0].url
                  : "/images/default_product.png"
              }
              width={340}
              height={340}
              className='object-cover'
            />
          </div>
          <div className='mt-3 flex items-center space-x-3 overflow-auto'>
            {product?.images?.map((img) => (
              <a
                className='cursor-pointer border-2 p-1 hover:border-2 hover:border-blue-300'
                onClick={() => setImgPreview(img?.url)}>
                <img
                  src={img.url}
                  className=' h-14 w-14'
                  width='500'
                  height='500'
                />
              </a>
            ))}
          </div>
        </aside>
        <main className='flex flex-col p-2'>
          <h1 className='text-lg font-bold text-black '>{product.name}</h1>

          <div className='mt-2 flex items-center space-x-3'>
            <div className='flex items-center gap-3'>
              <StarRatings
                rating={product.ratings}
                starRatedColor='#ffb829'
                numberOfStars={5}
                starDimension='20px'
                starSpacing='2px'
                name='rating'
              />
              <p className='text-[#ffb829]'>{product.ratings}</p>
            </div>

            <div className='flex items-center justify-between gap-2'>
              <div className='rounded-full bg-gray-400 p-0.5'></div>
              <p className='text-base font-medium text-green-500'>Verified</p>
            </div>
          </div>
          <h2 className='my-3 text-xl font-bold text-black'>
            ${product.price}
          </h2>
          <div className='flex flex-col space-y-3'>
            <p className='text-gray-700'>{product.description}</p>
            <div>
              <button
                className='rounded-md bg-blue-800 py-2.5 px-3 text-white flex items-center gap-3'
                onClick={() => dispatch(addToCart(product))}>
                <BsCart4 className="h-6 w-6"/>
                Add to cart
              </button>
            </div>
          </div>

          <div className='mt-4'>
            <ul className='mb-5'>
              <li className='mb-1'>
                <b className='inline-block w-36 font-medium'>Stock</b>
                {product.stock > 0 ? (
                  <span className='text-green-500'>In Stock</span>
                ) : (
                  <span className='text-red-500'>Out of Stock</span>
                )}
              </li>
              <li className='mb-1'>
                <b className='inline-block w-36 font-medium'>Category:</b>
                <span className='text-gray-500'>{product?.category}</span>
              </li>
              <li className='mb-1'>
                {" "}
                <b className='inline-block w-36 font-medium'>Seller / Brand:</b>
                <span className='text-gray-500'>{product?.seller}</span>
              </li>
            </ul>
          </div>
        </main>
      </div>

      <hr className='mt-7' />

      <div className=' mt-5'>
        <h1 className='text-xl font-bold text-gray-500'>
          Other Customer Reviews
        </h1>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default productDetail;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const product = await getProduct(id);
  console.log(product);

  return {
    props: {
      product,
    },
  };
}
