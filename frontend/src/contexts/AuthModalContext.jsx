// src/contexts/AuthModalContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

export function AuthModalProvider({ children }) {
  const [modalType, setModalType] = useState(null);

  const openSignin = () => setModalType('signin');
  const openRegister = () => setModalType('register');
  const closeModal = () => setModalType(null);

  return (
    <AuthModalContext.Provider value={{ modalType, openSignin, openRegister, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}
