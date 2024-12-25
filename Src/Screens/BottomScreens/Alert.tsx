import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next'

const notifications = [
    {
        id: '1',
        name: 'John Doe',
        time: '1 min ago',
        message: 'Thank you for registering. Tap to update your profile & alert settings.',
    },
    {
        id: '2',
        name: 'Jane Smith',
        time: '5 min ago',
        message: 'Your profile has been updated successfully.',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        time: '10 min ago',
        message: 'New alert settings are available. Tap to view.',
    },
    {
        id: '4',
        name: 'John Doe',
        time: '1 min ago',
        message: 'Thank you for  registering. Tap to update your profile & alert settings.',
    },
    {
        id: '5',
        name: 'Jane Smith',
        time: '5 min ago',
        message: 'Your profile has been updated successfully.',
    },
    {
        id: '6',
        name: 'Mike Johnson',
        time: '10 min ago',
        message: 'New alert settings are available. Tap to view.',
    },
    {
        id: '7',
        name: 'Mike Johnson',
        time: '10 min ago',
        message: 'New alert settings are available. Tap to view.',
    },
];

const Alert = () => {
    const { t } = useTranslation();

    //@ts-ignore
    const renderNotification = ({ item }) => (
        <View style={styles.notifybox}>
            <View style={styles.flex2}>
                <Text style={styles.text3}>{item.name}</Text>
                <Text style={styles.text4}>{item.time}</Text>
            </View>
            <Text style={styles.text5}>{item.message}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.main}>
            <View style={{ padding: 10 }}>
                <Text style={styles.Heading}>{t("Notifications")}</Text>
                <View style={styles.flex1}>
                    <Text style={styles.text1}>{t("Notifications")}</Text>
                    <TouchableOpacity>
                        <Text style={styles.text2}>{t("Mark as read")}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default Alert;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        height: '100%',
    },
    Heading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
    },
    flex1: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text1: {
        fontSize: 16,
        color: '#212121',
        fontWeight: '500',
    },
    text2: {
        fontSize: 14,
        color: '#8F8F8F',
        fontWeight: '500',
    },
    notifybox: {
        height: 90,
        width: '100%',
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    flex2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    text3: {
        fontSize: 16,
        color: '#212121',
        fontWeight: '500',
    },
    text4: {
        fontSize: 14,
        color: '#8F8F8F',
        fontWeight: '500',
    },
    text5: {
        fontSize: 14,
        color: '#888888',
        padding: 5,
    },
})