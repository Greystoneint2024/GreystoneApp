import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { baseURL } from '../../../BaseUrl';

const OtpScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const inputRefs = useRef([]);

    const handleChange = (value: string, index: number) => {
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < otp.length - 1) {
            //@ts-ignore
            inputRefs.current[index + 1].focus();
        }
    };

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const resendOtp = () => {
        setOtp(['', '', '', '']);
        setTimeLeft(60);
    };

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const fetchEmailOrPhone = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                setEmailOrPhone(value);
            }
        } catch (error) {
            console.error('Error retrieving Email or Phone: ', error);
        }
    };

    useEffect(() => {
        fetchEmailOrPhone();
        console.log(emailOrPhone)
    }, []);
    console.log(emailOrPhone)
    const toast = useToast();
    const handleSubmit = async () => {
        const otpString = otp.join('');
        axios.post(
            `${baseURL}/users/verifyOTP`,
            {
                email: emailOrPhone,
                otp: otpString,
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then(async res => {
                console.log(res)

                toast.show('Submit Successfully ', { type: 'success' });
                //@ts-ignore
                navigation.navigate('ChangePass');
            })
            .catch(err => {
                const errorMsg = err?.response?.data?.message || 'invalidEmailOrPhone';
                toast.show(errorMsg, { type: 'danger' });
                console.log(err);
            });
    };
    return (
        <SafeAreaView style={styles.main}>
            <ScrollView>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Entypo name='chevron-left' color={'#000'} size={25} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View>
                        <Image style={styles.logo} source={require('../../Assets/Logo/logo1.png')} />
                    </View>
                    <Text style={styles.title}>OTP Verification</Text>
                    <Text style={styles.title2}>Enter the code we sent to</Text>
                    <Text style={styles.title2}>{emailOrPhone ? emailOrPhone : 'not found'}</Text>
                    <Text style={styles.timerText}>
                        {timeLeft > 0 ? `Time left: 00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : 'Time expired'}
                    </Text>
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                //@ts-ignore
                                ref={(el) => (inputRefs.current[index] = el)}
                                style={styles.otpInput}
                                value={digit}
                                onChangeText={(value) => handleChange(value, index)}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.logbtn}
                        //@ts-ignore
                        onPress={handleSubmit}>
                        <Text style={styles.logintxt}>Submit</Text>
                    </TouchableOpacity>

                    {timeLeft === 0 && (
                        <TouchableOpacity
                            style={styles.flextxt}
                            onPress={resendOtp}>
                            <Text style={styles.resendText2}>Didn't receive the OTP?</Text>
                            <Text style={styles.resendText}>Resend OTP</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    back: {
        height: 40,
        width: 40,
        marginHorizontal: 15,
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        alignSelf: 'center',
        height: 80,
        width: 85,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        color: '#333',
    },
    title2: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 5,
        color: '#636363',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20,
    },
    otpInput: {
        borderWidth: 1.5,
        borderColor: '#8A6144',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
    },
    timerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginTop: 10,
    },
    resendText: {
        color: '#C4A77E',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resendText2: {
        color: '#212121',
        fontSize: 16,
    },
    flextxt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 5
    },
    logbtn: {
        backgroundColor: '#101828',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    logintxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default OtpScreen;
