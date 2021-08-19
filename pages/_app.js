import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import AuthProvider from '../src/contexts/AuthContext';
import { AuthContext } from '../src/contexts/AuthContext';

import Footer from "../src/components/shared/footer";
import TopAppbar from "../src/components/shared/TopAppbar";

import { themeApp, themeAppBar } from '../src/theme';

const Layout = ({ children, appbarSettings, tabSelectedIndex }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <>
      {isAuthenticated &&
        <Box p={2} bgcolor='secondary.main'>
          Início de sessão como Administrador feita com sucesso!
        </Box>
      }
      <TopAppbar config={appbarSettings} value={tabSelectedIndex} />
      {children}
      <Footer />
    </>
  )
}


export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [appbarSettings, setAppbarSettings] = React.useState(themeAppBar['dark']);
  const [tabSelectedIndex, setTabSelectedIndex] = React.useState(0);

  const setTheme = (theme) => {
    setAppbarSettings(themeAppBar[theme]);
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Jesus Nosso Modelo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/logo_mini.png" />

      </Head>
      <ThemeProvider theme={themeApp}>
        <CssBaseline />
        <AuthProvider>
          <Layout appbarSettings={appbarSettings} tabSelectedIndex={tabSelectedIndex}>
            <Component {...pageProps} setTheme={setTheme} setTabSelectedIndex={setTabSelectedIndex} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
