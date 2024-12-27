import { ScrollView, TouchableOpacity, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import { baseURL } from '../../../BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

axios.defaults.baseURL = baseURL;

const { width, height } = Dimensions.get('window');
const scaleSize = (size: number) => (width / 375) * size;
const scaleFont = (size: number) => (width / 375) * size;

const UpdatePassword = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();
    const toast = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.show('New password and confirm password do not match.', { type: 'danger' });
            return;
        }

        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                toast.show('User not authenticated.', { type: 'danger' });
                return;
            }

            await axios.put(
                '/users/updatePassword',
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accessToken
                    },
                },
            );

            toast.show('Password Updated', { type: 'success' });
            navigation.navigate("Account" as never);
        } catch (error) {
            const message =
                error?.response?.data?.details?.[0]?.detail ||
                error?.response?.data?.details?.[0]?.error ||
                error?.response?.data?.details?.[0]?.message ||
                error?.response?.data?.message ||
                'Failed to update password';
            toast.show(message, { type: 'danger', dangerColor: '#f66' });
        }
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.back}>
                            <Entypo name='chevron-left' color={'#000'} size={scaleSize(25)} />
                        </TouchableOpacity>
                        <Text style={styles.changep}>{t('Change Password')}</Text>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>{t('Current Password')}</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('Current Password')}
                                secureTextEntry={!passwordVisible}
                                placeholderTextColor={'#667085'}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            >
                                <Feather
                                    name={passwordVisible ? 'eye' : 'eye-off'}
                                    size={scaleSize(20)}
                                    color={'#d9d9d9'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>{t('New Password')}</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('New Password')}
                                secureTextEntry={!passwordVisible}
                                placeholderTextColor={'#667085'}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            >
                                <Feather
                                    name={passwordVisible ? 'eye' : 'eye-off'}
                                    size={scaleSize(20)}
                                    color={'#d9d9d9'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.emailtxt}>{t('Confirm Password')}</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('Confirm Password')}
                                secureTextEntry={!passwordVisible2}
                                placeholderTextColor={'#667085'}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible2(!passwordVisible2)}
                                style={styles.eyeIcon}
                            >
                                <Feather
                                    name={passwordVisible2 ? 'eye' : 'eye-off'}
                                    size={scaleSize(20)}
                                    color={'#d9d9d9'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={updatePassword}
                        style={styles.logbtn}>
                        <Text style={styles.logintxt}>{t('Save New Password')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdatePassword

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: scaleSize(10),
        backgroundColor: '#FFFF',
    },
    back: {
        height: scaleSize(40),
        width: scaleSize(40),
        marginHorizontal: scaleSize(15),
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pass: {
        marginHorizontal: scaleSize(20),
        marginVertical: scaleSize(10),
    },
    input: {
        alignSelf: 'center',
        width: '100%',
        fontSize: scaleFont(14),
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: scaleSize(10),
        borderColor: '#D0D5DD'
    },
    emailtxt: {
        fontSize: scaleFont(16),
        color: '#344054',
        fontWeight: 'bold',
        marginBottom: scaleSize(10),
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: scaleSize(15),
    },
    logbtn: {
        backgroundColor: '#101828',
        borderRadius: scaleSize(10),
        height: scaleSize(50),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
        width: '90%',
    },
    logintxt: {
        fontSize: scaleFont(18),
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    changep: {
        alignSelf: "center",
        fontSize: scaleFont(18),
        fontWeight: '500',
        marginBottom: scaleSize(20),
        marginTop: scaleSize(20),
        color: '#344054',
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        // gap: scaleSize(60)
    }
});

