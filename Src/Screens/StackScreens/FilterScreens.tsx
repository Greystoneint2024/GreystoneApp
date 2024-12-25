import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Checkbox } from 'react-native-paper';
import SliderCompo from './SliderCompo';
import { useTranslation } from 'react-i18next'
//@ts-ignore
const FilterScreens = ({ navigation }) => {
    const { t } = useTranslation();
    const [activeButton, setActiveButton] = useState('');
    const [priceRange, setPriceRange] = useState([0, 580000]);
    const [checked, setChecked] = React.useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [bedroomMin, setBedroomMin] = useState('');
    const [bedroomMax, setBedroomMax] = useState('');
    const [bathroomMin, setBathroomMin] = useState('');
    const [bathroomMax, setBathroomMax] = useState('');

    const handlePress = (button: React.SetStateAction<string>) => {
        setActiveButton(button);
    };

    const handleValuesChange = (values: React.SetStateAction<number[]>) => {
        setPriceRange(values);
    };

    const handleReset = () => {
        setActiveButton('');
        setPriceRange([0, 580000]);
        setChecked(false);
        setChecked2(false);
        setChecked3(false);
        setLocation('');
        setCity('');
        setPropertyType('');
        setBedroomMin('');
        setBedroomMax('');
        setBathroomMin('');
        setBathroomMax('');
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            onPress={navigation.goBack}
                            style={styles.back}
                        >
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                        <Text style={styles.changep}>{t("Filter")}</Text>
                        <TouchableOpacity onPress={handleReset}>
                            <Text style={styles.resrttxt}>{t("Reset")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexBtns}>
                        <TouchableOpacity
                            style={[
                                styles.allebtns,
                                activeButton === 'All' && styles.activeBtn
                            ]}
                            onPress={() => handlePress('All')}
                        >
                            <Text style={activeButton === 'All' ? styles.alltxtActive : styles.alltxt}>{t("All")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.allebtns2,
                                activeButton === 'Sale' && styles.activeBtn
                            ]}
                            onPress={() => handlePress('Sale')}
                        >
                            <Text style={activeButton === 'Sale' ? styles.alltxtActive : styles.alltxt2}>{t("Sale")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.allebtns2,
                                activeButton === 'Rental' && styles.activeBtn
                            ]}
                            onPress={() => handlePress('Rental')}
                        >
                            <Text style={activeButton === 'Rental' ? styles.alltxtActive : styles.alltxt2}>{t("Rental")}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.loc}>{t("Location")}</Text>
                    <View style={styles.inputloc}>
                        <TextInput
                            placeholderTextColor={'#667085'}
                            placeholder={t("Country")}
                            value={location}
                            onChangeText={setLocation}
                        />
                    </View>
                    <Text style={styles.loc}>{t("City")}</Text>
                    <View style={styles.inputloc}>
                        <TextInput
                            placeholder={t("Barcelona")}
                            placeholderTextColor={'#667085'}
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>
                    <Text style={styles.loc}>{t("Property Type")}</Text>
                    <View style={styles.inputloc}>
                        <TextInput
                            placeholderTextColor={'#667085'}
                            placeholder={t("Detached Villa - Apartment - Townhouse")}
                            value={propertyType}
                            onChangeText={setPropertyType}
                        />
                    </View>
                    <Text style={styles.bed}>{t("Bedrooms")}</Text>
                    <View style={styles.inputlocflex}>
                        <View style={styles.inputloc1}>
                            <TextInput
                                placeholderTextColor={'#667085'}
                                placeholder={t('Min')}
                                keyboardType='numeric'
                                value={bedroomMin}
                                onChangeText={setBedroomMin}
                            />
                        </View>
                        <View style={styles.inputloc1}>
                            <TextInput
                                placeholderTextColor={'#667085'}
                                placeholder={t('Max')}
                                keyboardType='numeric'
                                value={bedroomMax}
                                onChangeText={setBedroomMax}
                            />
                        </View>
                    </View>
                    <Text style={styles.bed}>{t("Bathrooms")}</Text>
                    <View style={styles.inputlocflex}>
                        <View style={styles.inputloc1}>
                            <TextInput
                                placeholderTextColor={'#667085'}
                                placeholder={t('Min')}
                                keyboardType='numeric'
                                value={bathroomMin}
                                onChangeText={setBathroomMin}
                            />
                        </View>
                        <View style={styles.inputloc1}>
                            <TextInput
                                placeholderTextColor={'#667085'}
                                placeholder={t('Max')}
                                keyboardType='numeric'
                                value={bathroomMax}
                                onChangeText={setBathroomMax}
                            />
                        </View>
                    </View>
                    <Text style={styles.bed}>{t("Price Range")}</Text>
                    <SliderCompo
                        //@ts-ignore
                        priceRange={priceRange} onValuesChange={handleValuesChange} />
                    <View style={styles.check}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                            color="#101828"
                        />
                        <Text style={styles.checktxt}>{t("Exclusive Property")}</Text>
                    </View>
                    <View style={styles.check}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                            color="#101828"
                        />
                        <Text style={styles.checktxt}>{t("New Built")}</Text>
                    </View>
                    <View style={styles.check}>
                        <Checkbox
                            status={checked3 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked3(!checked3);
                            }}
                            color="#101828"
                        />
                        <Text style={styles.checktxt}>{t("Pool")}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.reslbtn}>
                        <Text style={styles.lotxt}>{t("See results")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FilterScreens;

const styles = StyleSheet.create({
    mainContainer: {
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
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 10
    },
    resrttxt: {
        fontSize: 16,
        fontWeight: '600',
        color: '#101828',
    },
    flexBtns: {
        backgroundColor: '#f5f5f6',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 50,
        borderRadius: 30,
        marginVertical: 10
    },

    allebtns: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '33%',
        alignSelf: 'center',
        borderRadius: 30,
    },
    allebtns2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '33%',
        alignSelf: 'center',
        borderRadius: 30
    },
    activeBtn: {
        backgroundColor: '#101828',
    },
    alltxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500'
    },
    alltxt2: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500'
    },
    alltxtActive: {
        color: '#fff',
    },
    loc: {
        fontSize: 16,
        fontWeight: '500',
        color: '#344054',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    bed: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
        color: '#344054',
        marginHorizontal: 20,
    },
    inputloc: {
        alignSelf: 'center',
        width: '90%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#D0D5DD'
    },
    inputloc1: {
        alignSelf: 'center',
        width: '45%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#D0D5DD',
        color: '#000'
    },
    inputlocflex: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    container: {
        padding: 20,
        backgroundColor: '#FFF',
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: '#344054',
        marginBottom: 20,
    },

    priceLabel: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 60,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    label2: {
        fontSize: 16,
        marginRight: 10,
    },
    statusText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#101828',
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    checktxt: {
        fontSize: 16,
        marginLeft: 10,
        color: '#101828',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    sliderContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    priceText: {
        fontSize: 16,
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    selectedRange: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    reslbtn: {
        backgroundColor: '#101828',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: '90%',
    },
    lotxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});