import ProfileLayout from "@/components/ProfileLayout";
import { getProducts, deleteProduct } from "@/helper/product";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import Paginator from "@/components/Paginator";
import { useState } from "react";

const Products = ({ products }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;
  

  return (
    <ProfileLayout>
      <div className='rounded-md border-2 p-4 shadow-sm'>
        <h1 className='mb-5 text-2xl font-bold text-black'>
          {products.length} Products
        </h1>
        <div className='grid grid-cols-4 gap-4 py-4'>
          <div className='font-medium uppercase text-gray-500'>Name</div>
          <div className='font-medium uppercase text-gray-500'>Stock</div>
          <div className='font-medium uppercase text-gray-500'>Price</div>
          <div className='font-medium uppercase text-gray-500'>Action</div>
          {products
            .slice(pagesVisited, pagesVisited + ordersPerPage)
            .map((product) => (
              <>
                <div className='text-sm' key={product._id}>
                  {product.name.substring(0,35)}...
                </div>
                <div className='text-sm'>{product.stock}</div>
                <div className='text-sm'>${product.price.toFixed(2)}</div>
                <div className='flex items-center gap-3'>
                  <button className='flex h-7   w-7 cursor-pointer items-center justify-center rounded-md border-[1px] bg-indigo-100 transition duration-200 hover:scale-110 active:scale-90'>
                    <CiEdit className='text-indigo-800' />
                  </button>

                  <div className='flex h-7   w-7 cursor-pointer items-center justify-center rounded-md border-[1px] bg-red-100 transition duration-200 hover:scale-110 active:scale-90' onclick={()=> deleteProduct(product._id)}>
                    <BsTrash className='text-red-800' />
                  </div>
                </div>
              </>
            ))}
        </div>

        <Paginator
          data={products}
          ordersPerPage={ordersPerPage}
          setPageNumber={setPageNumber}
        />
      </div>
    </ProfileLayout>
  );
};

export default Products;

export async function getServerSideProps() {
  const products = await getProducts();

  console.log(products);

  return {
    props: {
      products,
    },
  };
}
