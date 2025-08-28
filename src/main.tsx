import AppRouter from '@app/AppRouter';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
);
