import { FlatList, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../BaseUrl';

const Favorites = ({ data }) => {
    const { t } = useTranslation();
    const [favoriteCards, setFavoriteCards] = useState<{ [key: number]: boolean }>({});

    const toggleHeart = (id: number) => {
        setFavoriteCards(prev => ({ ...prev, [id]: !prev[id] }));
    };
    // const [data, setData] = useState([])
    // const fetchData = async () => {
    //     const userId = await AsyncStorage.getItem('userId');

    //     try {
    //         const response = await axios.get(`${baseURL}/Favoritlistes/getFavoritesByUserId/${userId}`);
    //         setData(response.data?.favorites);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    //     console.log(data, 'dataas')
    // }, []);

    const favoriteData = [
        {
            id: '1',
            name: 'HOOGTE',
            price: '€ 2.850.000',
            location: 'Malaga',
            bed: 4,
            bath: 5,
            pool: true,
            image: require('../../Assets/Images/hotel.png'),
        },
        {
            id: '2',
            name: 'HOOGTE 31 D',
            price: '€ 2.850.000',
            location: 'Malaga',
            bed: 4,
            bath: 5,
            pool: true,
            image: require('../../Assets/Images/hotel.png'),
        },
        {
            id: '3',
            name: 'HOOGTE KADIJK 31 D',
            price: '€ 2.850.000',
            location: 'Malaga',
            bed: 4,
            bath: 5,
            pool: true,
            image: require('../../Assets/Images/hotel.png'),
        },
        {
            id: '4',
            name: 'HOOGTE KADIJK 31 D',
            price: '€ 2.850.000',
            location: 'Malaga',
            bed: 4,
            bath: 5,
            pool: true,
            image: require('../../Assets/Images/hotel.png'),
        },
    ];

    //@ts-ignore
    const renderItem = ({ item }) => {
        const { Listing } = item;

        return (
            <View style={styles.mainCard}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Image style={styles.Image}
                        source={{ uri: `${baseURL}/images/${Listing?.image}` }}
                    />
                    <View style={{ flexDirection: 'column', gap: 5 }}>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', gap: 145 }}>
                                <View style={styles.sale}>
                                    <Text style={styles.salee}>{t("Sale")}</Text>
                                </View>
                                <TouchableOpacity onPress={() => toggleHeart(item.id)}>
                                    <AntDesign
                                        name={favoriteCards[item.id] ? 'heart' : 'hearto'}
                                        size={25}
                                        color={favoriteCards[item.id] ? 'red' : 'gray'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.name}>{Listing?.propertyType}</Text>
                        <Text style={styles.price}>€ {Listing?.price}</Text>
                    </View>
                </View>
                <View style={styles.flexicons}>
                    <View style={styles.flexicons2}>
                        <Ionicons name='location' size={20} color={'#101828'} />
                        <Text style={styles.text}>{Listing?.address}</Text>
                    </View>
                    <View style={styles.flexicons2}>
                        <FontAwesome name='bed' size={20} color={'#101828'} />
                        <Text style={styles.text}>{Listing?.bedroom}</Text>
                        <Text style={styles.text}>{t("Bed")}</Text>
                    </View>
                    <View style={styles.flexicons2}>
                        <FontAwesome name='bath' size={20} color={'#101828'} />
                        <Text style={styles.text}>{Listing?.bathroom}</Text>
                        <Text style={styles.text}>{t("Bath")}</Text>
                    </View>
                    {
                        Listing?.pool && (
                            <View style={styles.flexicons2}>
                                <FontAwesome5 name='swimming-pool' size={20} color={'#101828'} />
                                <Text style={styles.text}>{t("Pool")}</Text>
                            </View>
                        )
                    }

                </View>
            </View>
        )
    };
    console.log(data, 'data')

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <View style={styles.mainContainer}>
                <Text style={styles.Contact}>{t("Favorites")}</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#FFFF',
    },
    Contact: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginVertical: 20,
    },
    mainCard: {
        height: 140,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: '#D0D5DD',
        padding: 15,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    flexicons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    flexicons2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#888888',
    },
    card: {
        flexDirection: 'row',
        gap: 15
    },
    Image: {
        height: 85,
        width: 90,
        borderRadius: 10,
    },
    sale: {
        width: 60,
        height: 25,
        backgroundColor: '#ebebe8',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    salee: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000'
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#292929',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    }
});
