import { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const CustomThemeContext = createContext({
  darkMode: false,
  updateCurrentTheme: () => {}
});

export default function CustomThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const backgroundColor = darkMode ? '#171c25' : '#f8f9fc';
  const paperColor = darkMode ? '#222b36' : '#fff';
  const theme = createTheme({
    palette: {
      type: paletteType,
      primary: {
        light: '#00B0B9',
        main: '#006BA6',
        dark: '#002A3A'
      },
      background: {
        paper: paperColor,
        default: backgroundColor
      }
    },
    typography: {
      fontFamily: ['Poppins', 'Ubuntu', 'sans-serif'].join(',')
    }
  });

  const updateCurrentTheme = () => {
    setDarkMode(!darkMode);
  };
  const contextValue = { darkMode, updateCurrentTheme };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}
