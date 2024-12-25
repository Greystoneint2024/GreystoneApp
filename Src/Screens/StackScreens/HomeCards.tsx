import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, FlatList, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import { t } from 'i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../BaseUrl';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/core';
//@ts-ignore
const HomeCards = ({ Favdata, fetchFavData }) => {
    const [selectedButton, setSelectedButton] = useState('All');
    const navigation = useNavigation();
    const initialData = [
        {
            id: '1',
            images: [require('../../Assets/Images/d.jpg'),
            require('../../Assets/Images/d2.jpg'),
            require('../../Assets/Images/d3.jpg'),
            require('../../Assets/Images/hotel.png'),],
            address: 'HOOGTE KADIJK 31 D',
            price: '€ 2.850.000',
            location: 'Malaga',
            beds: 4,
            baths: 5,
            pool: true,
            type: "newProject",
            Category: 'New Project',
            demand: 'High Demand',
            commission: 'Units available',
            percentage: '4',
            completionDate: '2-march-2027',
        },
        {
            id: '2',
            type: "resale",
            Category: 'Resale',
            images: [require('../../Assets/Images/d.jpg'),
            require('../../Assets/Images/d2.jpg'),
            require('../../Assets/Images/d3.jpg'),
            require('../../Assets/Images/hotel.png'),],
            address: 'HOOGTE KADIJK 31 D',
            price: '€ 2.850.000',
            location: 'Malaga',
            beds: 4,
            baths: 5,
            pool: true,
            demand: 'High Demand',
            commission: 'Units available',
            percentage: '14',
            completionDate: '2-march-2027',
        },
        {
            id: '3',
            type: "rent",
            Category: 'Rent',
            images: [require('../../Assets/Images/d.jpg'),
            require('../../Assets/Images/d2.jpg'),
            require('../../Assets/Images/d3.jpg'),
            require('../../Assets/Images/hotel.png'),],
            address: 'HOOGTE KADIJK 31 D',
            price: '€ 2.850.000',
            location: 'Malaga',
            beds: 4,
            baths: 5,
            pool: true,
            demand: 'High Demand',
            commission: 'Units available',
            percentage: '14',
            completionDate: '2-march-2027',
        },
    ]
    const [cardData, setCardData] = useState(
        initialData
    )

    const [activeIndex, setActiveIndex] = useState(0);


    const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(contentOffsetX / windowWidth);
        setActiveIndex(currentIndex);
    };


    const [searchQuery, setSearchQuery] = useState('');
    const windowWidth = Dimensions.get('window').width;
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/listings/all`);
            setCardData(response.data?.listings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredData = cardData.filter((item) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
            item.address.toLowerCase().includes(lowercasedQuery) ||
            item.area.toLowerCase().includes(lowercasedQuery) ||
            item.postCode.toLowerCase().includes(lowercasedQuery)
        );
    });
    const toast = useToast()
    const [favorites, setFavorites] = useState(cardData.map(() => false));
    const [favIds, setFavIds] = useState({});

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavIds = JSON.parse(await AsyncStorage.getItem('favIds')) || {};
                const initialFavorites = cardData.map((item) => !!storedFavIds[item.id]);
                setFavorites(initialFavorites);
                setFavIds(storedFavIds);
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavorites();
    }, [cardData]);

    const toggleFavorite = async (index, itemId) => {
        const userId = await AsyncStorage.getItem('userId');
        const selectedFavId = favIds[itemId];

        try {
            if (favorites[index]) {
                const response = await axios.delete(
                    `${baseURL}/Favoritlistes/deleteFavorite/${selectedFavId}`
                );
                toast.show('Removed from favorites', { type: 'success' });
                console.log('Deleted favorite:', response.data);

                const updatedFavIds = { ...favIds };
                delete updatedFavIds[itemId];
                setFavIds(updatedFavIds);
                fetchFavData()
                await AsyncStorage.setItem('favIds', JSON.stringify(updatedFavIds));
            } else {
                const response = await axios.post(
                    `${baseURL}/Favoritlistes/addFavoritliste`,
                    {
                        itemId,
                        userId,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                toast.show('Added to favorites', { type: 'success' });
                console.log('Added favorite:', response.data?.data);
                fetchFavData()
                const newFavId = response.data?.data?.id;
                const updatedFavIds = { ...favIds, [itemId]: newFavId };
                setFavIds(updatedFavIds);
                await AsyncStorage.setItem('favIds', JSON.stringify(updatedFavIds));
            }

            const updatedFavorites = [...favorites];
            updatedFavorites[index] = !favorites[index];
            setFavorites(updatedFavorites);
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Action failed';
            toast.show(errorMessage, { type: 'danger', dangerColor: '#f66' });
            console.error('Error during favorite action:', error);
        }
    };

    const renderCard = ({ item, index }) => (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.imagecont}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {/* {item.images.map((image: ImageSourcePropType | undefined, index: React.Key | null | undefined) => ( */}
                    <Image source={{
                        uri: `${baseURL}/images/${item?.image}`
                    }} style={[styles.imageinn, { width: windowWidth }]} />
                </ScrollView>

                <View style={styles.flexitems}>
                    <TouchableOpacity style={styles.flexbtn}>
                        <Text style={{ position: 'absolute', color: '#FFF', fontSize: 15 }}>{t(item?.propertyType)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            toggleFavorite(index, item.id);
                        }}
                    >
                        <AntDesign
                            name={favorites[index] ? 'heart' : 'hearto'}
                            size={25}
                            color={favorites[index] ? 'red' : '#FFF'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                // onPress={async () => {
                //     AsyncStorage.setItem('listingId', item?.id?.toString())
                //     navigation.navigate('PropertyDetail', { item })
                // }}
                //@ts
                onPress={() => navigation.navigate('PropertyDetail', { item })}

            >
                <View style={styles.flexprice}>
                    <Text style={styles.name}>{item?.address}</Text>
                    <Text style={styles.name}>€ {item?.price}</Text>
                </View>
                <View style={styles.flexicons}>
                    <View style={styles.flexicons2}>
                        <Ionicons name='location' size={20} color={'#101828'} />
                        <Text style={styles.text}>{item?.area}</Text>
                    </View>
                    <View style={styles.flexicons2}>
                        <FontAwesome name='bed' size={20} color={'#101828'} />
                        <Text style={styles.text}>{item?.bedroom}</Text>
                        <Text style={styles.text}>{t("Bed")}</Text>
                    </View>
                    <View style={styles.flexicons2}>
                        <FontAwesome name='bath' size={20} color={'#101828'} />
                        <Text style={styles.text}>{item?.bathroom}</Text>
                        <Text style={styles.text}>{t("Bath")}</Text>
                    </View>
                    {item?.pool && (
                        <View style={styles.flexicons2}>
                            <MaterialCommunityIcons name='pool' size={20} color={'#101828'} />
                            <Text style={styles.text}>{t("Pool")}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            {(item?.type === "resale" || item?.type === "rent") ? <View>
                <TouchableOpacity
                    style={styles.downbtn}>
                    <Text style={styles.downtxt}>{t("Download Information")}</Text>
                    <Feather name='download' size={25} color={'#fff'} />
                </TouchableOpacity>
            </View> : <View>
                <View style={styles.btnsflex}>
                    <View style={styles.btnhgh}>
                        <Text style={styles.txt1}>{t("High Demand")}</Text>
                    </View>
                    <View style={styles.btnhgh2}>
                        <Text style={styles.txt2}>{item.percentage}</Text>
                        <Text style={styles.txt2}>{t("Units available")}</Text>
                    </View>
                </View>

                <View style={styles.line} />
                <View style={styles.flexlast}>
                    <Text style={styles.txt4}>{t("Completion")}</Text>
                    <View style={styles.line2} />
                    <Text style={styles.txt3}>{item.completionDate}</Text>
                </View>
                <View style={styles.line} />
            </View>}
        </View>
    );


    const handleFilter = (value: string) => {
        if (value === "All") {
            setCardData(initialData)
        } else {


            const newArr = initialData.filter((item) => item.type === value);
            setCardData(newArr)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <FlatList
                data={filteredData}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <View style={styles.mainContainer}>
                        <View style={styles.searchContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Feather name='search' color={'#64748b'} size={25} />
                                <TextInput
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    placeholder="Search by city, zip, address..."
                                    placeholderTextColor="#64748b"
                                />
                            </View>
                            <TouchableOpacity
                                //@ts-ignore
                                onPress={() => navigation.navigate("FilterScreens")}>
                                <Ionicons name='filter' color={'#101828'} size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fourflex}>
                            <TouchableOpacity
                                style={[styles.btnall, selectedButton === 'All' && styles.selectedButton]}
                                onPress={() => {
                                    setSelectedButton('All')
                                }}
                            >
                                <Text style={[styles.btnalltext, selectedButton === 'All' && styles.selectedButtonText]}>{t("All")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnall2, selectedButton === 'Resale' && styles.selectedButton]}
                                onPress={() => {
                                    setSelectedButton('Resale')
                                }}
                            >
                                <Text style={[styles.btnalltext2, selectedButton === 'Resale' && styles.selectedButtonText]}>{t("Resale")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnall2, selectedButton === 'Rent' && styles.selectedButton]}
                                onPress={() => {
                                    setSelectedButton('Rent')
                                }}
                            >
                                <Text style={[styles.btnalltext2, selectedButton === 'Rent' && styles.selectedButtonText]}>{t("Rent")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnall2, selectedButton === 'New Projects' && styles.selectedButton]}
                                onPress={() => {
                                    setSelectedButton('New Projects')
                                }}
                            >
                                <Text style={[styles.btnalltext2, selectedButton === 'New Projects' && styles.selectedButtonText]}>{t("New Projects")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
            <TouchableOpacity
                //@ts-ignore
                onPress={() => navigation.navigate("BottomNavigation")}
                style={styles.switchCards}>
                <AntDesign name='bars' size={24} color={'#FFF'} />
                <Text style={styles.swtext}>{t("Switch to map")}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default HomeCards;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFFFF',
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
    fourflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
        marginHorizontal: 10
    },
    btnall: {
        borderColor: '#dadada',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    btnall2: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: '#dadada',
        borderWidth: 1,
    },
    btnalltext: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    btnalltext2: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedButton: {
        backgroundColor: '#101828',
    },
    selectedButtonText: {
        color: '#FFF',
    },
    imagecont: {
        height: 200,
        width: '100%',
        backgroundColor: '#E5E5E5',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageinn: {
        resizeMode: 'cover',
        height: 200,
        width: '100%',

    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    flexitems: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    flexbtn: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(000, 000, 000, 0.6)',
        borderRadius: 50,
        zIndex: 1,
    },
    flexprice: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    name: {
        color: '#292929',
        fontSize: 16,
        fontWeight: '700',
    },
    flexicons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    btnhgh: {
        height: 40,
        width: '45%',
        backgroundColor: '#DBDCDF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    btnhgh2: {
        height: 40,
        width: '45%',
        backgroundColor: '#101828',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        gap: 5,
    },
    btnsflex: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txt1: {
        fontSize: 16,
        fontWeight: '700',
        color: '#101828',
    },
    txt2: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    line: {
        width: '100%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DBDCDF'
    },
    flexlast: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    line2: {
        height: 20,
        width: 1,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DBDCDF'
    },
    txt3: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    txt4: {
        fontSize: 15,
        fontWeight: '600',
        color: '#888888',
    },
    downbtn: {
        backgroundColor: '#101828',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        marginVertical: 10,
    },
    downtxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    switchCards: {
        height: 50,
        width: 160,
        backgroundColor: '#4F4F4F',
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
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
})