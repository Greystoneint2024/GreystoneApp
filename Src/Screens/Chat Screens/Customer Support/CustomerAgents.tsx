import { Alert, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';


const CustomerAgents = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);


    const ActiveChat = [
        { id: '1', name: 'Rabika', role: 'Broker', image: require('../../../Assets/Images/d.jpg') },
        { id: '2', name: 'Rabika', role: 'Broker', image: require('../../../Assets/Images/d2.jpg') },
        { id: '3', name: 'Rabika', role: 'Broker', image: require('../../../Assets/Images/d3.jpg') },
    ];


    const renderOnline = ({ item, navigation }: { item: any, navigation: any }) => (

        <Swipeable renderRightActions={() => renderRightActions(item)}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ChatInboxFaq" as never)}
                style={styles.chatbox}>
                <View style={styles.container}>
                    <Image
                        source={item.image}
                        style={styles.profilePic}
                    />
                    <View style={styles.onlineDot} />
                </View>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phoneno}>{item.role}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );

    const handleDelete = (notification: React.SetStateAction<null>) => {
        setSelectedNotification(notification);
        setShowModal(true);
    };

    const confirmDelete = () => {
        setShowModal(false);
        Alert.alert('History Deleted');
    };

    const renderRightActions = (notification: any) => {
        return (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(notification)}>
                <MaterialCommunityIcons name='delete-empty' color={'#FFF'} size={30} />
            </TouchableOpacity>
        );
    };
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.mainContainer}>
                            <View style={styles.flex}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Contact" as never)}
                                    style={styles.back}>
                                    <Entypo name='chevron-left' color={'#000'} size={25} />
                                </TouchableOpacity>
                                <Text style={styles.Contact}>{t("Customer support")}</Text>
                            </View>
                            <View style={styles.searchContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Feather name='search' color={'#64748b'} size={25} />
                                    <TextInput
                                        placeholderTextColor={'#64748b'}
                                        placeholder={t("Search..")}
                                    />
                                </View>
                            </View>
                            <Text style={styles.txt}>Chat with our live agents 24/7</Text>
                        </View>
                    }
                    data={ActiveChat}
                    renderItem={({ item }) => renderOnline({ item, navigation })}
                    keyExtractor={(item) => item.id}
                />
                <Modal
                    transparent={true}
                    visible={showModal}
                    animationType="fade"
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.crossbtn}
                                onPress={() => setShowModal(false)}>
                                <Entypo name='cross' size={25} color={'#000'} />
                            </TouchableOpacity>
                            <View style={styles.flexicontxt}>
                                <Image
                                    style={styles.bin}
                                    source={require('../../../Assets/Icons/bin.png')} />
                                <Text style={styles.modalText22}>Delete Chat?</Text>

                            </View>
                            <Text style={styles.modalText33}>Are you sure you want to delete the chat?</Text>

                            <TouchableOpacity style={styles.YesButton}>
                                <Text style={styles.YesButtonText}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.NoButton}>
                                <Text style={styles.YesButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default CustomerAgents;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
    },
    back: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    Contact: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#344054',
    },
    para: {
        fontSize: 16,
        fontWeight: '400',
        color: '#4d4d4d',
        marginTop: 20,
        marginHorizontal: 10,
    },
    searchContainer: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 30,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    txt: {
        fontSize: 16,
        color: '#212121',
        fontWeight: '600',
        marginVertical: 10,
    },
    chatbox: {
        width: '96%',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 8,
        alignItems: 'center',
        paddingLeft: 10,
        gap: 10,
        flexDirection: 'row',
    },
    imgbox: {
        height: 45,
        width: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        borderWidth: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    phoneno: {
        fontSize: 12,
        fontWeight: '500',
        color: '#72757A',
    },
    chattext: {
        right: 10,
    },
    online: {
        height: 9,
        width: 9,
        borderRadius: 50,
        backgroundColor: '#25D366',
        top: 15,
        left: 35,
    },
    container: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 40,
    },
    onlineDot: {
        width: 15,
        height: 15,
        backgroundColor: 'green',
        borderRadius: 7.5,
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: 'white',
    },
    deleteButton: {
        backgroundColor: '#101828',
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        marginTop: 5,
        left: 5,
        borderRadius: 10,
        height: 55
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
    crossbtn: {
        alignSelf: 'flex-end'
    },
    modalText22: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    modalText3: {
        fontSize: 16,
        fontWeight: '500',
        color: '#888888',
    },
    modalText33: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        width: '70%',
        alignSelf: 'center',
        marginVertical: 10,
        textAlign: "center"
    },
    bin: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    flexicontxt: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    YesButton: {
        backgroundColor: "#101828",
        padding: 10,
        borderRadius: 20,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    YesButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
    NoButton: {
        backgroundColor: "#ADADAD",
        padding: 10,
        borderRadius: 20,
        width: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
})
