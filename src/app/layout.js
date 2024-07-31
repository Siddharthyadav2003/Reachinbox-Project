'use client';

import { SessionProvider } from "next-auth/react"
import { AppProvider } from '../contexts/AppContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/theme';
import { useApp } from '../contexts/AppContext';
import StyledComponentsRegistry from '../lib/registry';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <SessionProvider>
            <AppProvider>
              <ThemeWrapper>{children}</ThemeWrapper>
            </AppProvider>
          </SessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

function ThemeWrapper({ children }) {
  const { theme } = useApp();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}