import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { CountryPicker } from 'react-native-country-codes-picker';
import { baseURL } from '../../../BaseUrl';
import { Toast, useToast } from 'react-native-toast-notifications';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [contactNumber, setcontactNumber] = useState('');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const navigation = useNavigation();
    const toast = useToast()
    const handleSignup = () => {
        if (!name || !email || !password || password !== confirmPassword) {
            toast.show("Error: Please fill in all fields correctly.", {
                type: "danger",
                dangerColor: '#f66'
            });
            return;
        }

        const payload = {
            name,
            email,
            password,
            contactNumber: `${countryCode}${contactNumber}`,
        };

        axios.post(`${baseURL}/users/register`, payload)
            .then(response => {
                toast.show("Signup successful", { type: "success" });
                navigation.navigate('Login' as never);
            })
            .catch(error => {
                toast.show("Signup Failed", {
                    type: "danger",
                    dangerColor: '#f66'
                });
                console.log(error);
                console.log(error?.response?.data?.message?.details, 'error details');

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
            });
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-left' color={'#000'} size={25} />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../../Assets/Logo/logo1.png')} />
                    <Text style={styles.text}>Register Now</Text>
                    <Text style={styles.text2}>Sign up and get access to exclusive features & support</Text>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Your name"
                            placeholderTextColor="#667085"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Your email"
                            keyboardType="email-address"
                            placeholderTextColor="#667085"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>Phone Number</Text>
                        <View style={styles.phoneContainer}>
                            <TouchableOpacity
                                onPress={() => setShowCountryPicker(true)}
                                style={styles.countryCodeContainer}
                            >
                                <Text style={styles.countryCodeText}>{countryCode}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Phone number"
                                placeholderTextColor="#667085"
                                keyboardType="phone-pad"
                                value={contactNumber}
                                onChangeText={setcontactNumber}
                            />
                        </View>
                    </View>
                    <CountryPicker
                        show={showCountryPicker}
                        pickerButtonOnPress={(item) => {
                            setCountryCode(item.dial_code);
                            setShowCountryPicker(false);
                        }} lang=""
                    />
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Your Password"
                                secureTextEntry={!passwordVisible}
                                placeholderTextColor="#667085"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            >
                                <Feather
                                    name={passwordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color="#d9d9d9"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry={!passwordVisible2}
                                placeholderTextColor="#667085"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible2(!passwordVisible2)}
                                style={styles.eyeIcon}
                            >
                                <Feather
                                    name={passwordVisible2 ? 'eye' : 'eye-off'}
                                    size={20}
                                    color="#d9d9d9"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.logbtn} onPress={handleSignup}>
                        <Text style={styles.logintxt}>Sign up</Text>
                    </TouchableOpacity>

                    {/* Login Navigation */}
                    <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center' }}>
                        <Text style={styles.text3}>Already have an account!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                            <Text style={styles.text4}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;

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
        marginTop: 10
    },
    pass: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    container: {
        padding: 16,
    },
    input: {
        alignSelf: 'center',
        width: '100%',
        height: 45,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        borderColor: '#D0D5DD',
        color: '#000',
    },
    emailtxt: {
        fontSize: 16,
        color: '#344054',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    forgtxt: {
        fontSize: 16,
        color: '#C4A77E',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'right',
        fontWeight: '500',
        right: 20
    },
    logbtn: {
        backgroundColor: '#101828',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
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
    googlebtn: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    gicon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: 10,
    },
    gicontxt: {
        fontSize: 16,
        color: '#344054',
        fontWeight: '500',
        marginLeft: 5,
        alignSelf: 'center',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: '#f9f9f9',
    },
    countryCodeContainer: {
        marginRight: 10,
    },
    countryCodeText: {
        fontSize: 16,
        color: '#000',
    },
    phoneInput: {
        flex: 1,
        fontSize: 16,
    },
})