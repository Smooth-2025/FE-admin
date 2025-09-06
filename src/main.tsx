import '@ant-design/v5-patch-for-react-19';

import AppRouter from '@app/AppRouter';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './shared/store/store';
import { GlobalStyle } from './shared/styles/globalStyle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
