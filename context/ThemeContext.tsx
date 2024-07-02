import { createContext, useState, ReactNode, useContext } from "react";
type themeContextT = {
  darkTheme: boolean;
  toggleTheme: () => void;
};
type ThemeProviderT = {
  children: ReactNode;
};
const ThemeContext = createContext<themeContextT | null>(null);

export default function ThemeProvider({ children }: ThemeProviderT) {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => {
    setDarkTheme((currenTheme) => !currenTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useThemeCtx() {
  return useContext(ThemeContext);
}
