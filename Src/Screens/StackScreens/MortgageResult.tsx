import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';
import CalculatePieChart from './CalculatePieChart';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MonthlyBreakdown {
  mortgagePayment: number;
  propertyTax: number;
  homeInsurance: number;
  otherCosts: number;
  summary: {
    total: number;
  };
}

interface Summary {
  homePrice: number;
  loanAmount: number;
  downPayment: number;
  totalMortgagePayment: number;
  totalInterest: number;
  payoffDate: string;
}

interface MortgageData {
  monthlyInstallment: number;
  monthlyBreakdown: MonthlyBreakdown;
  summary: Summary;
}

const MortgageResult = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [mortgageData, setMortgageData] = useState<MortgageData | null>(null);

  useEffect(() => {
    const fetchMortgageData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('mortgageResponse');
        if (savedData !== null) {
          setMortgageData(JSON.parse(savedData) as MortgageData);
        }
      } catch (error) {
        console.error('Failed to load mortgage data', error);
      }
    };

    fetchMortgageData();
  }, []);

  useEffect(() => {
    if (mortgageData) {
    }
  }, [mortgageData]);

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.flex}>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate("MortgageCalculator")}
              style={styles.back}>
              <Entypo name='chevron-left' color={'#000'} size={25} />
            </TouchableOpacity>
            <Text style={styles.changep}>{t("Calculator")}</Text>
          </View>
          <View style={styles.heading}>
            <Text style={styles.headingtxt}>{t("Monthly Installment:")}</Text>
            <Text style={styles.headingtxt}>{mortgageData?.monthlyInstallment}</Text>
          </View>
          <View style={styles.flextext}>
            <Text style={styles.txt}>{t("Mortgage Payment")}</Text>
            <Text style={styles.txt3}>{mortgageData?.monthlyBreakdown?.mortgagePayment}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Property Tax")}</Text>
            <Text style={styles.txt11}>{mortgageData?.monthlyBreakdown?.propertyTax}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Home Insurance")}</Text>
            <Text style={styles.txt11}>{mortgageData?.monthlyBreakdown?.homeInsurance}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Other Cost")}</Text>
            <Text style={styles.txt11}>{mortgageData?.monthlyBreakdown?.otherCosts}</Text>
          </View>

          <View style={styles.flextext}>
            <Text style={styles.txt}>{t("Total Payment")}</Text>
            <Text style={styles.txt3}>{mortgageData?.monthlyBreakdown?.summary?.total}</Text>
          </View>
          <CalculatePieChart mortgageData={mortgageData} />
          <View style={styles.flextwo}>
            <Text style={styles.flex1}>{t("House Price")}</Text>
            <Text style={styles.flex1}>{mortgageData?.summary?.homePrice}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Loan Amount")}</Text>
            <Text style={styles.txt11}>{mortgageData?.summary?.loanAmount}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Down Payment")}</Text>
            <Text style={styles.txt11}>{mortgageData?.summary?.downPayment}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Total of 360 Mortgage Payment")}</Text>
            <Text style={styles.txt11}>{mortgageData?.summary?.totalMortgagePayment}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Total Interest")}</Text>
            <Text style={styles.txt11}>{mortgageData?.summary?.totalInterest}</Text>
          </View>
          <View style={styles.flextext1}>
            <Text style={styles.txt11}>{t("Mortgage Pay off Date")}</Text>
            <Text style={styles.txt11}>{mortgageData?.summary?.payoffDate}</Text>
          </View>
          <View style={styles.flexbtns}>
            <TouchableOpacity style={styles.btnPrnt}>
              <Text style={styles.btnprnttxt}>{t("Download")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("PropertyDetail" as never)}
              style={styles.btnPrnt2}>
              <Text style={styles.btnprnttxt2}>{t("Close")}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.apply}>
            <Text style={styles.btnprnttxt}>{t("Apply For Pre-Approval")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MortgageResult

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    flex: 1,
    marginTop: 10,
    backgroundColor: '#FFFF',
  },
  back: {
    height: 40,
    width: 40,
    marginHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changep: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 20,
    color: '#344054',
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 100
  },
  heading: {
    height: 50,
    width: '100%',
    backgroundColor: '#101828',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    gap: 10

  },
  headingtxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  flextext: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginVertical: 10
  },
  txt: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  txt2: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  txt3: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  flextext1: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginVertical: 5
  },
  txt11: {
    color: '#101828',
    fontSize: 16,
    fontWeight: '500',
  },
  flextwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  flex1: {
    color: '#101828',
    fontSize: 18,
    fontWeight: '600',
  },
  selfelex: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnPrnt: {
    width: '60%',
    height: 50,
    backgroundColor: '#101828',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  btnprnttxt: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  apply: {
    width: '100%',
    height: 50,
    backgroundColor: '#101828',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  btnprnttxt2: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  flexbtns: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnPrnt2: {
    width: '35%',
    height: 50,
    backgroundColor: '#dbdddf',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

})