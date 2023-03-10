import Layout from '@/components/Layout'
import { persistor, store } from '@/redux/store';
import '@/styles/globals.css'
import { Poppins } from '@next/font/google';
import {SessionProvider} from "next-auth/react"
import { Provider } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={
            <div className='flex h-screen items-center justify-center'>
              <HashLoader color='#368dd6' />
            </div>
          }>
          <main className={poppins.className}>
            <Layout>
              <ToastContainer position='top-center'   />
              <Component {...pageProps} />
            </Layout>
          </main>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
