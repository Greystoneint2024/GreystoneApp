import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'


const AboutUs = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            //@ts-ignore
                            onPress={() => navigation.navigate("Account")}
                            style={styles.back}>
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image style={styles.logo} source={require('../../Assets/Logo/logo1.png')} />
                        <Text style={styles.text}>Greystone Real Estate Marbella</Text>
                    </View>
                    <View style={styles.flexicons}>
                        <TouchableOpacity style={styles.box}>
                            <Feather name='mail' size={21} color={'#767676'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <Ionicons name='call-outline' size={21} color={'#767676'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <FontAwesome name='whatsapp' size={21} color={'#767676'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <AntDesign name='instagram' size={21} color={'#767676'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.Discrp}>{t('About Us discription')}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUs

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
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 100
    },
    changep: {
        alignSelf: "center",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
        marginTop: 20,
        color: '#344054',
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
        color: '#000',
        textAlign: 'center',
    },
    box: {
        width: 44,
        height: 44,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#EBEBEB'
    },
    flexicons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignSelf: 'center'
    },
    Discrp: {
        fontSize: 16,
        fontWeight: '400',
        color: '#344054',
        marginHorizontal: 20,
        marginTop: 20,
        lineHeight: 25,
    }

})