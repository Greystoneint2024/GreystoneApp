import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const TermsService = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.back}>
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                        <Text style={styles.Contact}>{t("Terms of Service")}</Text>
                    </View>

                    <Text style={styles.para}>{t("Terms")}</Text>
                    <Text style={styles.para}>
                        You may be required to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password
                    </Text>
                    <Text style={styles.para}>
                        Welcome! These Terms of Service ("Terms") govern your access and use of the [App Name] mobile application (the "App") developed by [Your Company Name] ("we," "us," or "our"). By accessing or using the App, you agree to be bound by these Terms.
                    </Text>
                    <Text style={styles.para}>Welcome! These Terms of Service "Terms govern your access and use of the App Name mobile application the App developed by Your Company Name "we," "us," or "our". By accessing or using the App, you agree to be bound by these Terms.</Text>
                    <Text style={styles.para}>
                        You may be required to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password
                    </Text>
                    <Text style={styles.para}>
                        Welcome! These Terms of Service ("Terms") govern your access and use of the [App Name] mobile application (the "App") developed by [Your Company Name] ("we," "us," or "our"). By accessing or using the App, you agree to be bound by these Terms.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsService

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
    },
    back: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    Contact: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#344054',
    },
    para: {
        fontSize: 16,
        fontWeight: '400',
        color: '#4d4d4d',
        marginTop: 20,
        marginHorizontal: 10,
    }
})