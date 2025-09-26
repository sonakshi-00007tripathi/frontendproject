import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // ✅ Check token from localStorage on page load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
    }
  }, []);

  // ✅ Login function → store token
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setIsAuthenticated(true);
    setToken(jwtToken);
  };

  // ✅ Logout function → clear token
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



// import React, { createContext, useState, useEffect } from "react";

// // Named export for context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

//   useEffect(() => {
//     const storedAuth = localStorage.getItem("isAuthenticated");
//     if (storedAuth === "true") {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const login = () => {
//     setIsAuthenticated(true);
//     localStorage.setItem("isAuthenticated", "true");
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   // Loading fallback → no blank screen
//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
