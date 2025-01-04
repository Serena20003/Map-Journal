import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('View');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);

/*
  Created this context and wrapped it over the whole <App> 
  so the state of the user can be accessed everywhere with imports.
  It only provides the user instead of the whole auth instance to restrict access.
  Though <Login> and <SignUp> still use authIns, but it should be fine because
  they are writing to the database so they have to.
  */