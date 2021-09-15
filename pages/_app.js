import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CustomThemeProvider from '../theme/CustomThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loader from '../components/Loader';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const handleOpen = () => {
    setLoaderOpen(true);
  };
  const handleClose = () => {
    setLoaderOpen(false);
  };

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleOpen);
    router.events.on('routeChangeComplete', handleClose);
    router.events.on('routeChangeError', handleClose);

    return () => {
      router.events.off('routeChangeStart', handleOpen);
      router.events.off('routeChangeComplete', handleClose);
      router.events.off('routeChangeError', handleClose);
    };
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <CustomThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {loaderOpen ? (
          <Loader open={loaderOpen} />
        ) : (
          <Component {...pageProps} />
        )}
      </CustomThemeProvider>
    </React.Fragment>
  );
}
