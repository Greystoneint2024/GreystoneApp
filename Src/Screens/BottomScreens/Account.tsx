import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToast } from 'react-native-toast-notifications'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const Account = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const toast = useToast();
    const handleSignOut = () => {
        setShowModal(true);
    };

    const deleteToken = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            toast.show('User Logout', {
                type: 'success',
            });
            //@ts-ignore
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error deleting token:', error);
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                <View style={styles.mainContainer}>
                    <Text style={styles.Heading}>{t('My Account')}</Text>
                    {/* Profile */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ProfileEdit" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Ionicons name='person-circle-outline' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Profile')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Change Password */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("UpdatePassword" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Feather name='lock' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Change Password')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* About Us */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AboutUs" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialCommunityIcons name='office-building-marker' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('About Us')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Searches History */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SearchHistory" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialCommunityIcons name='selection-search' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Searches History')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Viewed History */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ViewedHistory" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Feather name='eye' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Viewed History')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Recommendations */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Recommendations" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialIcons name='recommend' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Recommendations')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Terms of Service */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TermsService" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <AntDesign name='exclamationcircleo' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Terms of Service')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Language */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Languages" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Ionicons name='language-outline' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Languages')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("HowItsWorks" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <FontAwesome name='play-circle' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('play')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                    {/* Constumer support */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CustomerAgents" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialIcons name='headset-mic' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Customer & support')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>

                    {/* Sign Out */}
                    <TouchableOpacity
                        onPress={handleSignOut}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialCommunityIcons name='logout' color={'#FF0000'} size={24} />
                                <Text style={styles.signout}>{t('Sign Out')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showModal}
                        animationType='slide'
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>{t('Are you sure')}</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.yesButton}
                                        onPress={() => {
                                            deleteToken();
                                            setShowModal(false)
                                        }}
                                    >
                                        <Text style={styles.buttonText}>{t('Yes')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.noButton}
                                        onPress={() => setShowModal(false)}
                                    >
                                        <Text style={styles.buttonText2}>{t('No')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Account;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mainContainer: {
        paddingTop: 20,
    },
    Heading: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flexicons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    signout: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#FF0000',
    },
    name2: {
        marginLeft: 100,
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    notifybox: {
        marginVertical: 10,
        width: '90%',
        height: 50,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#D0D5DD',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: "85%",
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center'
    },
    modalText: {
        fontSize: 22,
        fontWeight: '600',
        color: "#444444",
        marginBottom: 20
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20
    },
    yesButton: {
        backgroundColor: '#101829',
        borderRadius: 12,
        height: 42,
        width: 128,
        alignItems: "center",
        justifyContent: 'center',
    },
    noButton: {
        backgroundColor: '#DBDDDF',
        borderRadius: 12,
        height: 42,
        width: 128,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonText2: {
        color: '#000000',
        fontWeight: 'bold'
    },
})