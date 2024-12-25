import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

const FavoriteSelect = () => {
    const { t } = useTranslation();
    const [favoriteCards, setFavoriteCards] = useState<{ [key: number]: boolean }>({});
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const toggleHeart = (id: number) => {
        setFavoriteCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

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
    ];

    const handleSelectItem = (id: string) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(favoriteData.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleSend = () => {
        const selectedFavorites = favoriteData.filter((item) =>
            selectedItems.includes(item.id)
        );
        console.log('Selected items to send:', selectedFavorites);
    };
    const renderItem = ({ item }) => (
        <View style={styles.mainCard}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                    onPress={() => handleSelectItem(item.id)}
                    style={styles.checkboxContainer}
                >
                    <AntDesign
                        name={selectedItems.includes(item.id) ? 'checksquare' : 'checksquareo'}
                        size={18}
                        color={selectedItems.includes(item.id) ? '#101828' : 'gray'}
                    />
                </TouchableOpacity>

                <Image style={styles.Image} source={item.image} />
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
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text style={styles.price}>{item?.price}</Text>
                </View>
            </View>
            <View style={styles.flexicons}>
                <View style={styles.flexicons2}>
                    <Ionicons name='location' size={20} color={'#101828'} />
                    <Text style={styles.text}>{item?.location}</Text>
                </View>
                <View style={styles.flexicons2}>
                    <FontAwesome name='bed' size={20} color={'#101828'} />
                    <Text style={styles.text}>{item?.bed}</Text>
                    <Text style={styles.text}>{t("Bed")}</Text>
                </View>
                <View style={styles.flexicons2}>
                    <FontAwesome name='bath' size={20} color={'#101828'} />
                    <Text style={styles.text}>{item?.bath}</Text>
                    <Text style={styles.text}>{t("Bath")}</Text>
                </View>
                <View style={styles.flexicons2}>
                    <FontAwesome5 name='swimming-pool' size={20} color={'#101828'} />
                    <Text style={styles.text}>{t("Pool")}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <Text style={styles.Contact}>Favorites</Text>
                    <TouchableOpacity onPress={handleSelectAll}>
                        <Text style={styles.selectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={favoriteData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                />
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FavoriteSelect;

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
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', },

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
    },
    checkboxContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    selectAll: {
        fontSize: 16,
        fontWeight: '600',
        color: '#101828'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#F0F0F0',
        padding: 12,
        borderWidth: 1,
        borderColor: '#101828',
        borderRadius: 8
    },
    sendButton: {
        flex: 1,
        backgroundColor: '#101828',
        padding: 12,
        borderRadius: 8
    },
    cancelText: {
        textAlign: 'center',
        color: '#101828',
        fontWeight: 'bold'
    },
    sendText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold'
    },
});
