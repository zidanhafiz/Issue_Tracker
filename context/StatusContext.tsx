'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type StatusContext = {
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const StatusContext = createContext({} as StatusContext);

const StatusContextProvider = ({ children }: { children: ReactNode }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const value = {
    isError,
    setIsError,
    isSuccess,
    setIsSuccess,
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

const useStatusContext = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatusContext must be used within StatusContextProvider');
  }
  return context;
};

export { StatusContextProvider, useStatusContext };
