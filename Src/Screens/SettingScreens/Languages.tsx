import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { getCurrentLocale, setLocale } from '../../Languages';

const Languages = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const locales = [
        { tag: 'en', name: 'English' },
        { tag: 'es', name: 'Spanish' },
        { tag: 'ar', name: 'Arabic' },
        { tag: 'pt', name: 'Portuguese' },
        { tag: 'ru', name: 'Russian' },
        { tag: 'fr', name: 'French' },
        { tag: 'de', name: 'German' },
        { tag: 'nl', name: 'Dutch' },
    ];
    //@ts-ignore
    const handleLanguageSelect = (languageTag) => {
        const selectedLocale = locales.find((l) => l.tag === languageTag);
        if (selectedLocale) {
            setSelectedLanguage(languageTag);
            i18n.changeLanguage(languageTag);
            setLocale(languageTag);
        }
    };

    useEffect(() => {
        const currentLocaleTag = getCurrentLocale();
        if (currentLocaleTag) {
            const currentLocale = locales.find((l) => l.tag === currentLocaleTag);
            if (currentLocale) {
                setSelectedLanguage(currentLocale.tag);
            }
        }
    }, []);
    //@ts-ignore
    const renderItem = ({ item }) => {
        const active = selectedLanguage === item.tag;
        return (
            <TouchableOpacity
                onPress={() => handleLanguageSelect(item.tag)}
                style={[styles.languageButton, active && styles.selectedButton]}>
                <Text style={styles.textSelect}>{t(item.tag)}</Text>
                {active && (
                    <FontAwesome6 name="check" size={20} color={'#101828'} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.flex}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.back}>
                        <Entypo name="chevron-left" color={'#000'} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.changep}>{t('Languages')}</Text>
                </View>
                <View style={styles.searchContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Feather name="search" color={'#667085'} size={25} />
                        <TextInput placeholder={t('search_language')} />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={locales}
                        renderItem={renderItem}
                        keyExtractor={item => item.tag}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Languages;

const styles = StyleSheet.create({
    mainContainer: {
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
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 20,
        marginTop: 20,
        color: '#344054',
    },
    flex: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    searchContainer: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
    },
    languageButton: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        // marginTop: 20,
    },
    selectedButton: {
        borderColor: '#FFA500',
        backgroundColor: '#dbdcdf',
    },
    checkContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSelect: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
});

