import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";


const Layout = ({ children }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col min-h-screen'>
      {router.pathname !== "/auth/register" &&
        router.pathname !== "/auth/login" && <Header path={router.route} />}
      <div >{children}</div>
      {router.pathname !== "/auth/register" &&
        router.pathname !== "/auth/login" && router.pathname.startsWith("/me")  === false && <Footer path={router.route} />}
    </div>
  );
};

export default Layout;
