import { Alert, Animated, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { baseURL } from '../../../BaseUrl';
import { useToast } from 'react-native-toast-notifications';
//@ts-ignore
const DateInput = ({ value, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event: any, selectedDate: any) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            onChange(selectedDate);
        }
    };
    return (
        <View style={styles.inputrate}>
            <TextInput
                style={styles.inputWithIcon}
                placeholder='MM/DD/YYYY'
                value={value ? value.toLocaleDateString() : ''}
                editable={false}
            />
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.calendarIcon}>
                <AntDesign name="calendar" size={20} color="#000" />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};
const MortgageCalculator = () => {
    const [startDate, seStartDate] = useState(null);
    const [rotation] = useState(new Animated.Value(0));
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();


    const rotationInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['335deg', '0deg'],
    });

    const iconStyle = {
        transform: [{ rotate: rotationInterpolate }],
    };
    const [selectedIcon, setSelectedIcon] = useState('percent');

    const toggleIcon = () => {
        setSelectedIcon(prevIcon => prevIcon === 'percent' ? 'dollar-sign' : 'percent');
    };

    const [homePrice, setHomePrice] = useState('');
    const [downPayment, setdownPayment] = useState('');
    const [loanTerms, setloanTerms] = useState('');
    const [interestRate, setinterestRate] = useState('');
    const [taxes, setTaxes] = useState('');
    const [Inusurance, setInusurance] = useState('');
    const [healthCare, setHealthCare] = useState('');
    const [CFees, setCFees] = useState('');
    const [otherCost, setOtherCost] = useState('');
    const toast = useToast()
    console.log(`${baseURL}/calculator/calculate`, 'baseURL')
    const saveProfile = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('token');

            const res = await axios.post(
                `${baseURL}/calculator/calculate`,
                {
                    homePrice: Number(homePrice),
                    downPaymentPercentage: Number(downPayment),
                    loanTermYears: Number(loanTerms),
                    interestRate: Number(interestRate),
                    startDate: startDate,
                    propertyTaxPercentage: Number(taxes),
                    homeInsurance: Number(Inusurance),
                    healthCare: Number(healthCare),
                    communityFees: Number(CFees),
                    otherCosts: Number(otherCost),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accessToken,
                    },
                }
            );

            await AsyncStorage.setItem('mortgageResponse', JSON.stringify(res.data));

            toast.show('Successfully saved', { type: 'success' });
            navigation.navigate("MortgageResult" as never);
        } catch (err) {
            console.error(err);
            const error = err as { response?: { data?: any }; message?: string };
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'An error occurred';
            toast.show(errorMessage, { type: 'danger', dangerColor: '#f66' });
            if (error?.response?.data?.details) {
                Alert.alert(
                    error.response?.data?.details[0]?.detail ||
                    error.response?.data?.details[0]?.message,
                );
            } else if (error?.response?.data?.error) {
                Alert.alert(
                    error?.response?.data?.error[0]?.error ||
                    error?.response?.data?.error[0]?.message ||
                    error?.response?.data?.error[0]?.detail,
                );
            } else {
                Alert.alert(error?.response?.data?.message);
            }
        }
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            // @ts-ignore
                            onPress={() => navigation.navigate("PropertyDetail")}
                            style={styles.back}>
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                        <Text style={styles.changep}>{t("Mortgage Calculator")}</Text>
                    </View>
                    <View style={styles.heading}>
                        <Text style={styles.headingtxt}>{t("Adjust the values and press calculate")}</Text>
                    </View>
                    <Text style={styles.loc}>{t("Home Price")}</Text>
                    <View style={styles.inputloc}>
                        <TextInput
                            value={homePrice}
                            onChange={e => setHomePrice(e.nativeEvent.text)}
                            placeholder={t('Price')}
                            keyboardType='numeric'
                        />
                    </View>
                    <Text style={styles.loc}>{t("Down Payment")}</Text>
                    <View style={styles.flexall}>
                        <View style={styles.inputpay}>
                            <TextInput
                                value={downPayment}
                                onChange={e => setdownPayment(e.nativeEvent.text)}
                                placeholder={t("Down Payment")}
                                keyboardType='numeric'
                            />
                            <Animated.View style={iconStyle}>
                                <Icon name="percent" size={18} color="#555555" />
                            </Animated.View>
                        </View>
                        <View style={styles.inputpercent}>
                            <Animated.View style={styles.iconStyle}>
                                <Feather name={selectedIcon} size={16} color="#555555" />
                            </Animated.View>
                            <TouchableOpacity onPress={toggleIcon}>
                                <FontAwesome5 name="exchange-alt" size={16} color="#555555" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.loc}>{t("Loan Term")}</Text>
                    <View style={styles.flexall}>
                        <View style={styles.inputpay}>
                            <TextInput
                                value={loanTerms}
                                onChange={e => setloanTerms(e.nativeEvent.text)}
                                placeholder={t('Years')}
                                keyboardType='numeric'
                            />
                        </View>
                        <Text style={styles.yeartxt}>{t("Years")}</Text>
                    </View>
                    <Text style={styles.loc}>{t("Interest Rate")}</Text>
                    <View style={styles.inputrate}>
                        <TextInput
                            value={interestRate}
                            onChange={e => setinterestRate(e.nativeEvent.text)}
                            placeholder={t("Interest Rate")}
                            keyboardType='numeric'
                        />
                        <Animated.View style={iconStyle}>
                            <Icon name="percent" size={18} color="#555555" />
                        </Animated.View>
                    </View>
                    <Text style={styles.loc}>{t("Start Date")}</Text>
                    <DateInput value={startDate} onChange={seStartDate} />
                    <View style={styles.check}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                const newChecked = !checked;
                                setChecked(newChecked);
                                setToggleCheckBox(newChecked);
                            }}
                            color="#101828"
                        />
                        <Text style={styles.checktxt}>{t("Include Taxes & Costs Below")}</Text>
                    </View>
                    {toggleCheckBox && (
                        <View>
                            <Text style={styles.loc}>{t("Annual Tax & Costs")}</Text>
                            <Text style={styles.loc}>{t("Property Taxes")}</Text>
                            <View style={styles.flexall}>
                                <View style={styles.inputpay}>
                                    <TextInput
                                        value={taxes}
                                        onChange={e => setTaxes(e.nativeEvent.text)}
                                        placeholder={t('Taxes')}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputpercent}>
                                    <Animated.View style={styles.iconStyle}>
                                        <Feather name={selectedIcon} size={16} color="#555555" />
                                    </Animated.View>
                                    <TouchableOpacity onPress={toggleIcon}>
                                        <FontAwesome5 name="exchange-alt" size={16} color="#555555" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.loc}>{t("Home Insurance")}</Text>
                            <View style={styles.flexall}>
                                <View style={styles.inputpay}>
                                    <TextInput
                                        value={Inusurance}
                                        onChange={e => setInusurance(e.nativeEvent.text)}
                                        placeholder={t("$00.0")}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputpercent}>
                                    <Animated.View style={styles.iconStyle}>
                                        <Feather name={selectedIcon} size={16} color="#555555" />
                                    </Animated.View>
                                    <TouchableOpacity onPress={toggleIcon}>
                                        <FontAwesome5 name="exchange-alt" size={16} color="#555555" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.loc}>{t("Health Care")}</Text>
                            <View style={styles.flexall}>
                                <View style={styles.inputpay}>
                                    <TextInput
                                        value={healthCare}
                                        onChange={e => setHealthCare(e.nativeEvent.text)}
                                        placeholder={t("$00.0")}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputpercent}>
                                    <Animated.View style={styles.iconStyle}>
                                        <Feather name={selectedIcon} size={16} color="#555555" />
                                    </Animated.View>
                                    <TouchableOpacity onPress={toggleIcon}>
                                        <FontAwesome5 name="exchange-alt" size={16} color="#555555" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.loc}>{t("Community Fees")}</Text>
                            <View style={styles.flexall}>
                                <View style={styles.inputpay}>
                                    <TextInput
                                        value={CFees}
                                        onChange={e => setCFees(e.nativeEvent.text)}
                                        placeholder={t("$00.0")}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputpercent}>
                                    <Animated.View style={styles.iconStyle}>
                                        <Feather name={selectedIcon} size={16} color="#555555" />
                                    </Animated.View>
                                    <TouchableOpacity onPress={toggleIcon}>
                                        <FontAwesome5 name="exchange-alt" size={16} color="#555555" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.loc}>{t("Other Costs")}</Text>
                            <View style={styles.flexall}>
                                <View style={styles.inputpay}>
                                    <TextInput
                                        value={otherCost}
                                        onChange={e => setOtherCost(e.nativeEvent.text)}
                                        placeholder={t("$00.0")}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputpercent}>
                                    <Animated.View style={styles.iconStyle}>
                                        <Feather name={selectedIcon} size={16} color="#555555" />
                                    </Animated.View>
                                    <TouchableOpacity onPress={toggleIcon}>
                                        <FontAwesome5 name="exchange-alt" size={16} color="#555555" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={styles.flexbtns}>
                        <TouchableOpacity
                            onPress={saveProfile}
                            style={styles.btnPrnt}>
                            <Text style={styles.btnprnttxt}>{t("Calculate")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnPrnt2}>
                            <Text style={styles.btnprnttxt2}>{t("Clear")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MortgageCalculator

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
        gap: 80
    },
    heading: {
        height: 40,
        width: '80%',
        backgroundColor: '#101828',
        marginTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        gap: 10,
        alignSelf: 'center'

    },
    headingtxt: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
    },
    flextext: {
        alignItems: "center",
        marginVertical: 10
    },
    txt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
    },
    loc: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555555',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    inputloc: {
        alignSelf: 'center',
        width: '100%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#D0D5DD'
    },
    inputpay: {
        width: '78%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#D0D5DD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    inputpercent: {
        width: '20%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#D0D5DD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    yeartxt: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555555'
    },
    inputrate: {
        width: '100%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#D0D5DD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderColor: '#D0D5DD',
        borderWidth: 2,
        borderRadius: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    inputWithIcon: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        paddingLeft: 10,
    },
    calendarIcon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    birthltxt: {
        marginTop: 15,
        fontSize: 16,
        color: '#344054',
        fontWeight: 'bold',
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    checktxt: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        color: '#212121',
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
    btnprnttxt2: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    flexbtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20

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
    flexall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    // inputpercent: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     // Add your style here
    // },
    iconStyle: {
        marginRight: 8,
        // Add your animation or styling here
    },
})

