import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Header from '../components/Header';
import Layout from '../components/Layouts/Layout';
import { Provider } from 'react-redux';
import store from '../state/store';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
    <Provider store={store}>
      <Header titre='Site e-commerce' />
      <Layout>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',

          colors: {
            // Add your color
            'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
            // or replace default theme color
            blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      </Layout>
      </Provider>
    </>
  );
}