import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CustomThemeProvider from '../theme/CustomThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
        <Component {...pageProps} />
      </CustomThemeProvider>
    </React.Fragment>
  );
}
