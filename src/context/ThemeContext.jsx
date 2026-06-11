/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
// El ThemeProvider envuelve a los componentes hijos y les proporciona acceso al estado del tema y la función para cambiarlo
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
// useEffect para aplicar o remover la clase "dark-mode" al body según el estado de darkMode, y para guardar la preferencia en localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
// Función para alternar entre modo oscuro y claro
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children} 
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
