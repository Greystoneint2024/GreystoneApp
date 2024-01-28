import { SafeAreaView, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next'
import MapView, { Marker } from 'react-native-maps';

const Home = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.main}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 36.5101,
                        longitude: -4.8824,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title="My Marker"
                        description="Some description here"
                    />
                </MapView>
                <View style={{ flex: 1, position: "relative" }}>
                    <View style={styles.searchContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Feather name='search' color={'#64748b'} size={25} />
                            <TextInput
                                style={{ color: '#000' }}
                                placeholderTextColor={'#64748b'}
                                placeholder={t("Search city, zip, address..")}
                            />
                        </View>
                        <TouchableOpacity
                            //@ts-ignore
                            onPress={() => navigation.navigate("FilterScreens")}>
                            <Ionicons name='filter' color={'#101828'} size={25} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        //@ts-ignore
                        onPress={() => navigation.navigate("HomeCards")}
                        style={styles.switchCards}>
                        <AntDesign name='bars' size={24} color={'#FFF'} />
                        <Text style={styles.swtext}>{t("Switch to cards")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchContainer: {
        width: '90%',
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 40,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    switchCards: {
        height: 50,
        width: 160,
        backgroundColor: '#4F4F4F',
        borderRadius: 50,
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    swtext: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '500'
    }
});
