"use client";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if(storedToken){
      setToken(storedToken);
    }
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    
  }

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    logout
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;