'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --background-light: #ffffff;
    --text-light: #333333;
    --background-dark: #1e1e1e;
    --text-dark: #ffffff;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body.light-mode {
    background-color: var(--background-light);
    color: var(--text-light);
  }

  body.dark-mode {
    background-color: var(--background-dark);
    color: var(--text-dark);
  }

  * {
    box-sizing: border-box;
  }

  /* Add any other global styles here */

  /* Example of theme-aware styling for common elements */
  a {
    color: ${props => props.theme.isDarkMode ? '#61dafb' : '#0066cc'};
    text-decoration: none;
  }

  button {
    background-color: ${props => props.theme.isDarkMode ? '#444' : '#e0e0e0'};
    color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.isDarkMode ? '#555' : '#d0d0d0'};
    }
  }
`;

export default GlobalStyles;