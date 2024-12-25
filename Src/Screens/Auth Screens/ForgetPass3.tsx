import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo'


const ForgetPass2 = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.back}>
                        <Entypo name='chevron-left' color={'#000'} size={25} />
                    </TouchableOpacity>
                    <View>
                        <Image style={styles.logo} source={require('../../Assets/Logo/Logo.png')} />
                    </View>
                    <Text style={styles.text}>Success</Text>
                    <Text style={styles.text2}>Please check your email for create
                        a new password</Text>
                    <View style={styles.remtxt}>
                        <Text style={styles.text3}>Can't get email?</Text>
                        <TouchableOpacity
                            //@ts-ignore
                            onPress={() => navigation.navigate("ForgetScreen")}>
                            <Text style={styles.text4}>Resubmit</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logbtn}
                        //@ts-ignore
                        onPress={() => navigation.navigate("ForgetPass2")}>
                        <Text style={styles.logintxt}>Back Email</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgetPass2

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
        height: 95,
        width: 130,
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
        borderColor: '#D0D5DD'
    },
    emailtxt: {
        fontSize: 16,
        color: '#344054',
        fontWeight: 'bold',
        marginBottom: 10,
    },


    logbtn: {
        backgroundColor: '#C4A77E',
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
        alignSelf: 'center',
        marginVertical: 10,
        // marginLeft: 20,
    }

})