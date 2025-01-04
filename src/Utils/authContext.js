import React, { createContext, useContext, useEffect, useState } from 'react';
import { authIns, checkAuthState } from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState((user) => {
      setCurrentUser(user);
      setLoading(false); // Mark as loaded once we know the auth state
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
      {loading && <div>LOADING...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/*
  Created this context and wrapped it over the whole <App> 
  so the state of the user can be accessed everywhere with imports.
  It only provides the user instead of the whole auth instance to restrict access.
  Though <Login> and <SignUp> still use authIns, but it should be fine because
  they are writing to the database so they have to.
  */