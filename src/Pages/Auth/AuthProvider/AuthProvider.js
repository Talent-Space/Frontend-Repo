import React, { createContext, useState, useEffect } from "react";
import Cookie from "cookie-universal";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const cookie = Cookie();
    const token = cookie.get("talent-space");

  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    const token = cookie.get("talent-space");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
