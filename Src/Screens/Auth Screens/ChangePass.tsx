import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../BaseUrl';
import { useToast } from 'react-native-toast-notifications';
const ChangePass = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const navigation = useNavigation();
    const toast = useToast();
    const [password, setPassword] = useState('');
    const [passwordCon, setpasswordCon] = useState('');


    const handleSubscribe = () => {
        if (password === passwordCon) {
            handleLogin();
        } else {
            toast.show('Password must be Same', {
                type: 'danger',
                dangerColor: '#f66',
            });
        }
    };
    const handleLogin = async () => {
        const email = await AsyncStorage.getItem('email');
        axios
            .post(
                `${baseURL}/users/resetpassword`,
                {
                    email: email,
                    newPassword: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(async res => {
                console.log(res)
                toast.show('Password Create Successfully', {
                    type: 'success',
                });

                //@ts-ignore
                navigation.navigate("Login")

            })
            .catch(err => {

                console.log(err, 'erro');
                if (err?.response?.data?.details) {
                    toast.show(
                        err.response?.data?.details[0]?.detail ||
                        err.response?.data?.details[0]?.message, {
                        type: 'danger',
                        dangerColor: '#f66',
                    }
                    );
                } else if (err?.response?.data?.error) {
                    toast.show(
                        err?.response?.data?.error[0]?.error ||
                        err?.response?.data?.error[0]?.message ||
                        err?.response?.data?.error[0]?.detail,
                        {
                            type: 'danger',
                            dangerColor: '#f66',
                        }
                    );
                } else {
                    toast.show(err?.response?.data?.message, {
                        type: 'danger',
                        dangerColor: '#f66',
                    });
                }

            });
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity style={styles.back}>
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                        <Text style={styles.changep}>Change Password</Text>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>New Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={password}
                                onChange={e => setPassword(e.nativeEvent.text)}
                                style={styles.input}
                                placeholder="Your Password"
                                secureTextEntry={!passwordVisible}
                                keyboardType="default"
                                placeholderTextColor={'#667085'}
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
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={passwordCon}
                                onChange={e => setpasswordCon(e.nativeEvent.text)}
                                style={styles.input}
                                placeholder="Your Password"
                                secureTextEntry={!passwordVisible2}
                                keyboardType="default"
                                placeholderTextColor={'#667085'}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible2(!passwordVisible2)}
                                style={styles.eyeIcon}
                            >
                                <Feather
                                    name={passwordVisible2 ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={'#d9d9d9'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        //@ts-ignore
                        onPress={handleSubscribe}
                        // onPress={() => }
                        style={styles.logbtn}>
                        <Text style={styles.logintxt}>Save New Password</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangePass

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
    pass: {
        marginHorizontal: 20,
        marginVertical: 10,
    },

    input: {
        alignSelf: 'center',
        width: '100%',
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        borderColor: '#D0D5DD',
        color: '#000'
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
        gap: 60
    }
})