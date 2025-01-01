import React, {createContext, useState} from "react";
import {Transaction} from "../types/transaction";

export interface IInitialState {
  currentTransaction: Transaction | null;
  transactions: Transaction[];
  addCurrentTransactions: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction[]) => void;
}

interface GlobalProviderProps {
  // define props here
  children?: any;
}

const initialState: IInitialState = {
  currentTransaction: null,
  transactions: [],
  addCurrentTransactions: () => {},
  updateTransaction: () => {},
};

// create Context
export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (
  props: React.PropsWithChildren<GlobalProviderProps>,
) => {
  const [state, setState] = useState(initialState);

  // To do
  const addCurrentTransactions = (transaction: Transaction) => {
    setState({...state, currentTransaction: transaction});
    // call the function
  };

  const updateTransaction = (transactions: Transaction[]) => {
    setState({...state, transactions});
  };

  return (
    <GlobalContext.Provider
      value={{
        addCurrentTransactions,
        updateTransaction,
        currentTransaction: state.currentTransaction,
        transactions: state.transactions,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
