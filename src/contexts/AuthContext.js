import React, { createContext, useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies'

import api from "../services/api"
import router from 'next/router';

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const authenticateAdmin = (token) => {

    setCookie(undefined, 'igreja.token', token, {
      maxAge: 60 * 30 * 1 // 1/2 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setIsAuthenticated(true);

    router.push('/');
  }

  useEffect(() => {
    if (parseCookies()['igreja.token'])
      setIsAuthenticated(true)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;