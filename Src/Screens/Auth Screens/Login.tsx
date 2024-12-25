import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { baseURL } from '../../../BaseUrl';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const toast = useToast();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.show("Please enter both email and password", {
                type: "danger",
                dangerColor: '#f66'
            });
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/users/signin`, {
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            await AsyncStorage.setItem('accessToken', response.data.accessToken?.toString());
            await AsyncStorage.setItem('userId', response.data.userId?.toString());
            navigation.navigate("BottomNavigation" as never);

        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Login Failed";
            toast.show(errorMessage, {
                type: "danger",
                dangerColor: '#f66'
            });
            console.error("Error during login:", error);
        }

    };
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Image style={styles.logo} source={require('../../Assets/Logo/logo1.png')} />
                    <Text style={styles.text}>Welcome Back</Text>
                    <Text style={styles.text2}>Sign in to access your account settings and favorites</Text>

                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Your email"
                            placeholderTextColor={'#667085'}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Your password"
                                placeholderTextColor={'#667085'}
                                secureTextEntry={!passwordVisible}
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
                                    color={'#d9d9d9'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgetScreen" as never)} >
                        <Text style={styles.forgtxt}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("BottomNavigation" as never)}
                        // onPress={handleLogin}
                        style={styles.logbtn}
                    >
                        <Text style={styles.logintxt}>Log in</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center' }}>
                        <Text style={styles.text3}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup" as never)}>
                            <Text style={styles.text4}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <View style={styles.orline} />
                    </View>
                    <TouchableOpacity style={styles.googlebtn}>
                        <Image style={styles.gicon} source={require('../../Assets/Icons/Google.png')} />
                        <Text style={styles.gicontxt}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.googlebtn}>
                        <AntDesign name='apple1' color={'#000'} size={25} />
                        <Text style={styles.gicontxt}>Continue with Apple</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#FFFF',
    },
    back: {
        height: 40,
        width: 40,
        marginHorizontal: 15,
        marginVertical: 20,
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
        height: 45,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 12,


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
    orline: {
        // width: '40%',
        height: 1,
        backgroundColor: '#D0D5DD',
        alignSelf: 'center',
        marginVertical: 20
    }
})