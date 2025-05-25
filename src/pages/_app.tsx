import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Head from 'next/head';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/toast/ToastContext';
import FloatingCart from '../components/cart/FloatingCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ToastProvider>
        <Head>
          <title>BEVARSE</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <FloatingCart />
        <Footer />
      </ToastProvider>
    </CartProvider>
  );
}

export default MyApp;