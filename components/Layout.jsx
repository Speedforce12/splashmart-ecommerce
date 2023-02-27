import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";


const Layout = ({ children }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col'>
      {router.pathname !== "/auth/register" &&
        router.pathname !== "/auth/login" && <Header path={router.route} />}
      <div>{children}</div>
      {router.pathname !== "/auth/register" &&
        router.pathname !== "/auth/login" && <Footer path={router.route} />}
    </div>
  );
};

export default Layout;
