import {ViewStyle} from "react-native/types";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  category: string;
  isSensitive: boolean;
  isDeducted: boolean;
  transactionID: string;
}

export type TransactionType = "History" | "Scheduled" | "Requested";

export interface TransactionList {
  type: TransactionType;
  onPress: (type: TransactionType) => void;
  style: ViewStyle;
}
