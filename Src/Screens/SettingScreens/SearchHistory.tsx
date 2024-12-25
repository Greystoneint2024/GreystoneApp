import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, Modal } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const SearchHistory = () => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const { t } = useTranslation();

    const notifications = [
        { id: '1', date: '22 May 2023', description: 'Search for "Apple Macbook Pro"', nbr: 69 },
        { id: '2', date: '10 June 2023', description: 'Search for "Samsung Galaxy S23"', nbr: 45 },
        { id: '4', date: '05 July 2023', description: 'Search for "PlayStation 5"', nbr: 80 },
        { id: '5', date: '22 May 2023', description: 'Search for "Apple Macbook Pro"', nbr: 69 },
        { id: '6', date: '10 June 2023', description: 'Search for "Samsung Galaxy S23"', nbr: 45 },
        { id: '7', date: '05 July 2023', description: 'Search for "PlayStation 5"', nbr: 80 },
        { id: '8', date: '22 May 2023', description: 'Search for "Apple Macbook Pro"', nbr: 69 },
        { id: '9', date: '10 June 2023', description: 'Search for "Samsung Galaxy S23"', nbr: 45 },
        { id: '10', date: '05 July 2023', description: 'Search for "PlayStation 5"', nbr: 80 },
    ];

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
    //@ts-ignore
    const renderNotification = ({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
            <View style={styles.notifybox}>
                <View>
                    <Text style={styles.name}>{item.date}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#212121' }}>
                        {t(item.description)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <View style={styles.nbr}>
                        <Text style={styles.nbr1}>{item.nbr}</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name='chevron-right' color={'#141B34'} size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </Swipeable>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            //@ts-ignore
                            onPress={() => navigation.navigate("Account")}
                            style={styles.back}
                        >
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                        <Text style={styles.contact}>{t("Searches History")}</Text>
                    </View>
                    <FlatList
                        data={notifications}
                        keyExtractor={item => item.id}
                        renderItem={renderNotification}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                    <Modal
                        transparent={true}
                        visible={showModal}
                        animationType="fade"
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>{t("Are you sure")}</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.yesButton}
                                        onPress={confirmDelete}
                                    >
                                        <Text style={styles.buttonText}>{t("Yes")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.noButton}
                                        onPress={() => setShowModal(false)}
                                    >
                                        <Text style={styles.buttonText2}>{t("No")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        backgroundColor: '#FFFFF',
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
        gap: 80
    },
    contact: {
        fontSize: 18,
        fontWeight: '500',
        color: '#212121',
    },
    notifybox: {
        marginVertical: 10,
        width: '90%',
        height: 80,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#D0D5DD',
        borderRadius: 10,
        paddingHorizontal: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 5,
    },
    nbr: {
        width: 40,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#E5EEFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nbr1: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000'
    },
    deleteButton: {
        backgroundColor: '#101819',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        marginTop: 10,
        left: 5,
        borderRadius: 5,
        height: 75
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold'
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
});

export default SearchHistory;

