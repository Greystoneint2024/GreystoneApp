import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
//@ts-ignore
import { UIActivityIndicator } from 'react-native-indicators';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const SplashScreen = (props: any) => {

    const navigation = useNavigation()
    const getUser = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const { data } = await axios.get(`/users/getCurrentUser`, {
                headers: {
                    accessToken,
                },
            });
            console.log(data)
            //@ts-ignore
            navigation.navigate('StackNavigator', {
                screen: 'BottomNavigation',
            });

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser();
    }, []);


    return (
        <View style={styles.InnerContainer}>
            <StatusBar backgroundColor="#101828" barStyle="light-content" />

            <View style={{ gap: 20 }}>
                <Image
                    source={require('../Assets/Logo/Logo.png')}
                    style={{ width: 138, height: 145, alignSelf: 'center' }}
                    resizeMode="contain"
                />
                <View>
                    <View>
                        <Text style={{ marginTop: 50, alignSelf: 'center' }}>
                            <UIActivityIndicator key='hello' color="#FFF" size={38} />
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    InnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101828',
    },
});

export default SplashScreen;
