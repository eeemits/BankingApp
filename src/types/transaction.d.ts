import {TextStyle, ViewStyle} from "react-native/types";
import {IconProps} from "../components";

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

export interface TransactionDetails {
  amount: number;
  category: string;
  date: string;
  description: string;
  details: Details;
  from: string;
  id: string;
  isDeducted: boolean;
  to: string;
  transactionID: string;
  type: string;
}

export interface Details {
  paymentMethod: string;
  merchantDetails: MerchantDetails;
  location: Location;
  transactionStatus: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
}

export interface MerchantDetails {
  name: string;
  contact: string;
}

export type TransactionType = "History" | "Scheduled" | "Requested";

export interface TransactionList {
  type: TransactionType;
  onPress: (type: TransactionType) => void;
  style: ViewStyle;
}

export type PageType = "Dashboard" | "TransactionDetails" | "Login";

export interface SectionContainerList {
  label: string;
  subLabel: string;
  labelStyle?: TextStyle;
  subLabelStyle?: TextStyle;
  iconStyle?: IconProps;
  style?: ViewStyle;
}
