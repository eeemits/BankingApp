import {View, Text, ViewStyle, TouchableOpacity} from "react-native";
import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {GlobalContext} from "../../context/GlobalState";
import details from "../../network/transactionDetails.json";
import {
  CardContainer,
  CustomSpacer,
  Icon,
  ScrollableList,
  SectionContainer,
} from "../../components";
import {
  colorBlue,
  fs14BoldWhite2,
  fs18BoldWhite2,
  sh12,
  sh8,
  sw8,
  sh20,
  fs16BoldGray1,
  sh1,
  fullWidth,
  colorGray,
  fs14SemiBoldRose1,
  centerHV,
  fs12BoldBlack2,
  fs12SemiBoldJett3,
  colorWhite,
  colorJet,
  sw16,
  fs14SemiBoldGreen1,
} from "../../styles";
import {
  SectionContainerList,
  TransactionDetails,
} from "../../types/transaction";
import {formatDateTime} from "../../utils";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../types/route";

export const DetailsPage: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProps>();
  const {currentTransaction} = useContext(GlobalContext);
  const [currentDetails, setCurrentDetails] = useState<
    TransactionDetails | undefined
  >();

  const handleFetchTransactionDetails = () => {
    const foundItem = details.find(item => item.id === currentTransaction?.id);
    if (!foundItem) {
      console.warn("Transaction not found:", currentTransaction);
    }
    setCurrentDetails(foundItem as TransactionDetails);
  };

  useEffect(() => {
    if (currentTransaction) {
      handleFetchTransactionDetails();
    }
  }, [currentTransaction]);

  const cardStyle: ViewStyle = {
    backgroundColor: colorBlue._3,
    width: "100%",
  };

  const commonSectionContainerList: SectionContainerList = {
    label: "",
    subLabel: "",
    labelStyle: fs12SemiBoldJett3,
    subLabelStyle: fs12BoldBlack2,
  };

  const cardSectionList: SectionContainerList[] = [
    {
      label: "Transaction Information",
      subLabel: "Additional Information",
    },
    {
      ...commonSectionContainerList,
      label: "Transaction ID",
      subLabel: currentDetails?.transactionID ?? "N/A",
      iconStyle: {name: "barcode", color: colorBlue._4},
    },
    {
      label: "Transfer Amount",
      subLabel: `${currentTransaction?.isDeducted ? "-" : "+"} MYR ${
        currentDetails?.amount?.toFixed(2) ?? "0.00"
      }`,
      labelStyle: fs12SemiBoldJett3,
      subLabelStyle: currentTransaction?.isDeducted
        ? fs14SemiBoldRose1
        : fs14SemiBoldGreen1,
      iconStyle: {name: "home", color: colorJet._4, size: sw16},
    },
    {
      ...commonSectionContainerList,
      label: "Date and Time",
      subLabel: currentDetails ? formatDateTime(currentDetails.date) : "N/A",
      iconStyle: {name: "calendar", color: colorBlue._4},
    },
    {
      ...commonSectionContainerList,
      label: "From",
      subLabel: currentDetails?.from ?? "N/A",
      iconStyle: {name: "person-stalker", color: colorBlue._4},
    },
    {
      ...commonSectionContainerList,
      label: "To Account",
      subLabel: currentDetails?.to ?? "N/A",
      iconStyle: {name: "icon_agile_scrum", color: colorBlue._4},
    },
    {
      ...commonSectionContainerList,
      label: "Contact",
      subLabel: currentDetails?.details?.merchantDetails.contact ?? "N/A",
      iconStyle: {name: "id-card", color: colorBlue._4},
    },
    {
      ...commonSectionContainerList,
      label: "Payment Method",
      subLabel: currentDetails?.details?.paymentMethod ?? "N/A",
      iconStyle: {name: "card", color: colorBlue._4},
    },
    {
      ...commonSectionContainerList,
      label: "Transaction status",
      subLabel: currentDetails?.details?.transactionStatus ?? "N/A",
      iconStyle: {name: "stats-chart", color: colorBlue._4},
    },
  ];

  const handleGoBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <Fragment>
      <ScrollableList
        items={[]}
        isHorizontal={false}
        contentContainerStyle={{
          paddingHorizontal: sw8,
          paddingVertical: sh12,
          marginVertical: sh20,
        }}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left-a" color={colorBlue._4} />
        </TouchableOpacity>
        <View style={{paddingVertical: sh12}}>
          <CardContainer
            style={cardStyle}
            title="Money Transfer Statistics"
            textStyles={fs18BoldWhite2}>
            <CustomSpacer space={sh8} />
            <Text style={fs14BoldWhite2}>
              You sent 14% more money this month than last month
            </Text>
          </CardContainer>
        </View>
        <View style={{...centerHV, paddingVertical: sh12}}>
          <Text style={fs16BoldGray1}>
            {currentDetails?.details.merchantDetails.name}
          </Text>
          <CustomSpacer space={sh8} />
          <View
            style={{
              ...fullWidth,
              height: sh1,
              backgroundColor: colorGray._3,
            }}
          />
        </View>
        <Fragment>
          <SectionContainer
            sections={cardSectionList}
            containerStyle={{
              paddingHorizontal: sw16,
              borderRadius: sw8,
              backgroundColor: colorWhite._1,
              paddingVertical: sh12,
            }}
          />
        </Fragment>
      </ScrollableList>
    </Fragment>
  );
};
