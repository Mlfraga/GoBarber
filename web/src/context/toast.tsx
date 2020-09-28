import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4'

import ToastContainer from '../components/ToastContainer';

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  descripton?: string;
}

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message) => {
    const id = uuid();
  }, [])

  const removeToast = useCallback(() => {

  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context;
}

export { ToastProvider, useToast };
