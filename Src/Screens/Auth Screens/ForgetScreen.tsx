import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo'
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import { baseURL } from '../../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgetScreen = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const toast = useToast()
    const handleSubmit = async () => {
        axios
            .post(
                `${baseURL}/users/sendOTP`,
                {
                    email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(async res => {
                toast.show('Otp send Successfully', {
                    type: 'success',
                });
                await AsyncStorage.setItem('email', email?.toString());
                //@ts-ignore
                navigation.navigate('OtpScreen');

            })
            .catch(err => {
                console.log(err)
                toast.show(' Failed', {
                    dangerColor: '#f66',
                    type: 'danger',
                });
                console.log(err.response?.data?.details, 'erro');
                if (err?.response?.data?.details) {
                    Alert.alert(
                        err.response?.data?.details[0]?.detail ||
                        err.response?.data?.details[0]?.message,
                    );
                } else if (err?.response?.data?.error) {
                    Alert.alert(
                        err?.response?.data?.error[0]?.error ||
                        err?.response?.data?.error[0]?.message ||
                        err?.response?.data?.error[0]?.detail,
                    );
                } else {
                    Alert.alert(err?.response?.data?.message);
                }

            });
    };
    console.log(email)
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.back}
                        onPress={() => navigation.goBack()}
                    >
                        <Entypo name='chevron-left' color={'#000'} size={25} />
                    </TouchableOpacity>
                    <View>
                        <Image style={styles.logo} source={require('../../Assets/Logo/logo1.png')} />
                    </View>
                    <Text style={styles.text}>Forget Password</Text>
                    <Text style={styles.text2}>Enter your registered email or phone number below</Text>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>Email / Phone number</Text>
                        <TextInput
                            value={email}
                            onChange={e => setEmail(e.nativeEvent.text)}
                            style={styles.input}
                            placeholder="Your email"
                            placeholderTextColor={'#667085'}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.remtxt}>
                        <Text style={styles.text3}>Remember the password?</Text>
                        <TouchableOpacity
                            //@ts-ignore
                            onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.text4}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logbtn}
                        //@ts-ignore
                        onPress={handleSubmit}>
                        <Text style={styles.logintxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgetScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 20,
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
    logo: {
        alignSelf: 'center',
        height: 80,
        width: 85,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    text2: {
        fontSize: 16,
        fontWeight: '500',
        width: '65%',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#808080',
        marginHorizontal: 30,
        textAlign: 'center',
    },
    email: {
        marginHorizontal: 20,
        marginTop: 20
    },
    pass: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    container: {
        padding: 16,
    },
    input: {
        alignSelf: 'center',
        width: '100%',
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        color: '#000',
        borderColor: '#D0D5DD',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emailtxt: {
        fontSize: 16,
        color: '#344054',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logbtn: {
        backgroundColor: '#101828',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        marginTop: 280
    },
    logintxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text3: {
        fontSize: 16,
        color: '#808080',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    text4: {
        fontSize: 16,
        color: '#C4A77E',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    remtxt: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 20,
    }

})