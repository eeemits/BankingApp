import React, {createContext, useState} from "react";
import {Transaction} from "../types/transaction";

export interface IInitialState {
  currentTransaction: Transaction | null;
  transactions: Transaction[];
  addCurrentTransactions: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction[]) => void;
  isAuthenticated: boolean;
  setAuthenticating: (authenticating: boolean) => void;
}

interface GlobalProviderProps {
  children?: any;
}

const initialState: IInitialState = {
  currentTransaction: null,
  transactions: [],
  isAuthenticated: false,
  addCurrentTransactions: () => {},
  updateTransaction: () => {},
  setAuthenticating: () => {},
};

export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (
  props: React.PropsWithChildren<GlobalProviderProps>,
) => {
  const [state, setState] = useState(initialState);

  const addCurrentTransactions = (transaction: Transaction) => {
    setState({...state, currentTransaction: transaction});
  };

  const updateTransaction = (transactions: Transaction[]) => {
    setState({...state, transactions});
  };

  const setAuthenticating = (isAuthenticated: boolean) => {
    setState({...state, isAuthenticated});
  };

  return (
    <GlobalContext.Provider
      value={{
        addCurrentTransactions,
        updateTransaction,
        setAuthenticating,
        isAuthenticated: state.isAuthenticated,
        currentTransaction: state.currentTransaction,
        transactions: state.transactions,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
