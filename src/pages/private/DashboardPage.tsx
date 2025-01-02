import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  HeaderSection,
  ScrollableList,
  CustomSpacer,
  CardContainer,
  CustomFlexSpacer,
  Icon,
  SensitiveText,
} from "../../components";
import {
  sh10,
  sw10,
  sh8,
  colorWhite,
  colorOrange,
  flexGrow,
  sh2,
  sw4,
  colorBlue,
  sw12,
  sh12,
  flexRowSbSb,
  fs12BoldWhite1,
  flexRow,
  colorRose,
  colorGreen,
  sw24,
  fs16BoldBlack2,
  fs12BoldGray2,
  fs10RegWhite2,
  fs10RegGray4,
  centerVertical,
  fs14BoldWhite2,
} from "../../styles";
import {
  Transaction,
  TransactionType,
  TransactionList,
} from "../../types/transaction";
import {isArrayNotEmpty, formatDateTime} from "../../utils";
import transactionData from "../../constants/transaction.json";
import {GlobalContext} from "../../context/GlobalState";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../types/route";

export const DashboardPage: FunctionComponent = ({}) => {
  const navigation = useNavigation<NavigationProps>();

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [refreshing, setRefreshing] = useState(false); // Track the pull-to-refresh state
  const [transactionType, setTransactionType] =
    useState<TransactionType>("History");
  const {addCurrentTransactions, updateTransaction, transactions} =
    useContext(GlobalContext);

  const ITEMS_PER_PAGE = 5;

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(async () => {
      const reversedData = [...transactionData].sort((a, b) =>
        b.date.localeCompare(a.date),
      );
      updateTransaction(reversedData as Transaction[]);
      setCurrentPage(1);
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionType === "History") {
      return true;
    }
    if (transactionType === "Scheduled") {
      return ["Utilities", "Rent", "Entertainment"].includes(
        transaction.category,
      );
    }
    if (transactionType === "Requested") {
      return (
        transaction.category === "Miscellaneous" || transaction.amount <= 100
      );
    }
    return false;
  });

  const handleLoadMore = useCallback(() => {
    if (currentPage * ITEMS_PER_PAGE < filteredTransactions.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentPage, filteredTransactions.length]);

  const onPressTransactionType = useCallback(
    (type: TransactionType) => setTransactionType(type),
    [],
  );

  const handleNavigateDetails = (transaction: Transaction) => {
    addCurrentTransactions(transaction);
    navigation.navigate("TransactionDetails");
  };

  const visibleTransactions = filteredTransactions.slice(
    0,
    currentPage * ITEMS_PER_PAGE,
  );

  const listStyle: ViewStyle = {
    paddingVertical: sh10,
    paddingHorizontal: sw10,
    borderRadius: sw10,
    marginBottom: sh8,
  };

  const listItems: TransactionList[] = [
    {
      type: "History",
      onPress: onPressTransactionType,
      style: listStyle,
    },
    {
      type: "Scheduled",
      onPress: onPressTransactionType,
      style: listStyle,
    },
    {
      type: "Requested",
      onPress: onPressTransactionType,
      style: listStyle,
    },
  ];

  useEffect(() => {
    updateTransaction(transactionData as Transaction[]);
  }, []);

  return (
    <Fragment>
      <HeaderSection
        spaceToBottom={sh8}
        containerStyle={{backgroundColor: colorOrange._2}}
      />

      <ScrollableList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingHorizontal: sw10,
          paddingVertical: sh10,
        }}
        style={flexGrow}
        items={[]}
        type={"History"}>
        <ScrollableList
          items={listItems}
          paddingVertical={sh2}
          type={transactionType}
          paddingHorizontal={sw4}
          isHorizontal={true}
        />
        <View
          style={{
            backgroundColor: colorBlue._3,
            borderRadius: sw10,
            paddingHorizontal: sw12,
            paddingVertical: sh12,
            marginVertical: sh10,
          }}>
          <View style={flexRowSbSb}>
            <Text style={fs12BoldWhite1}>Recent Transactions</Text>
            <Text style={fs12BoldWhite1} onPress={() => {}}>
              View all
            </Text>
          </View>
        </View>
        {isArrayNotEmpty(visibleTransactions) &&
          visibleTransactions.map((transaction: Transaction) => (
            <Fragment key={transaction.id}>
              <CardContainer
                style={{paddingVertical: sh10, paddingHorizontal: sw10}}
                key={transaction.id}
                backgroundColor={colorWhite._1}
                onPress={() => handleNavigateDetails(transaction)}>
                <Fragment>
                  <View style={flexRow}>
                    <CustomFlexSpacer />
                    <Icon
                      name={
                        transaction.isDeducted
                          ? "arrow-back-circle"
                          : "arrow-forward-circle"
                      }
                      color={
                        transaction.isDeducted ? colorRose._4 : colorGreen._1
                      }
                      size={sw24}
                    />
                  </View>
                  <Fragment>
                    <View style={{...flexRowSbSb, paddingVertical: sh2}}>
                      <Text style={fs16BoldBlack2}>{transaction.category}</Text>
                      <SensitiveText amount={transaction.amount} />
                    </View>
                    <View style={{...flexRowSbSb, paddingVertical: sh8}}>
                      <Text style={fs12BoldGray2}>
                        {transaction.description}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: sw4,
                          paddingVertical: sh2,
                          borderRadius: sw4,
                          backgroundColor:
                            transaction.type === "debit"
                              ? colorGreen._4
                              : colorRose._1,
                        }}>
                        <Text style={fs10RegWhite2}>{transaction.type}</Text>
                      </View>
                    </View>
                    <View style={flexRowSbSb}>
                      <Text style={fs10RegGray4}>Transaction ID</Text>
                      <Text style={fs10RegGray4}>
                        {formatDateTime(transaction.date, "date")}
                      </Text>
                    </View>
                    <View style={flexRowSbSb}>
                      <Text style={fs10RegGray4}>
                        {transaction.transactionID}
                      </Text>
                      <Text style={fs10RegGray4}>
                        {formatDateTime(transaction.date, "time")}
                      </Text>
                    </View>
                  </Fragment>
                </Fragment>
              </CardContainer>
              <CustomSpacer space={sh10} />
            </Fragment>
          ))}

        {currentPage * ITEMS_PER_PAGE < filteredTransactions.length && (
          <TouchableOpacity
            onPress={handleLoadMore}
            style={{
              padding: sh10,
              backgroundColor: colorBlue._3,
              borderRadius: sw10,
              marginTop: sh10,
              ...centerVertical,
            }}>
            <Text style={fs14BoldWhite2}>Load More</Text>
          </TouchableOpacity>
        )}
      </ScrollableList>
    </Fragment>
  );
};
