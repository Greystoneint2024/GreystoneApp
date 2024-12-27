import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, FlatList, ImageSourcePropType, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { t } from 'i18next';

const cardData = [
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
        demand: 'High Demand',
        commission: 'Commission',
        percentage: '4%',
        completionDate: '2-march-2027',
    },
    {
        id: '2',
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
        commission: 'Commission',
        percentage: '4%',
        completionDate: '2-march-2027',
    },
];
//@ts-ignore
const Recommendations = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const [favoriteCards, setFavoriteCards] = useState<{ [key: number]: boolean }>({});

    const toggleHeart = (id: number) => {
        setFavoriteCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(contentOffsetX / windowWidth);
        setActiveIndex(currentIndex);
    };
    //@ts-ignore
    const renderCard = ({ item }) => (
        <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.imagecont}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {item.images.map((image: ImageSourcePropType | undefined, index: React.Key | null | undefined) => (
                        <Image key={index} source={image} style={[styles.imageinn, { width: windowWidth }]} />
                    ))}
                </ScrollView>

                <View style={styles.dotContainer}>
                    {item.images.map((_: any, index: React.Key | null | undefined) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { backgroundColor: activeIndex === index ? '#000' : '#FFF' },
                            ]}
                        />
                    ))}
                </View>
                <View style={styles.flexitems}>
                    <View style={styles.flexbtn}>
                        <Text style={{ position: 'absolute', color: '#FFF', fontSize: 15 }}>{t("Sale")}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleHeart(item.id)}>
                        <AntDesign
                            name={favoriteCards[item.id] ? 'heart' : 'hearto'}
                            size={25}
                            color={favoriteCards[item.id] ? 'red' : '#FFF'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.flexprice}>
                <Text style={styles.name}>{item.address}</Text>
                <Text style={styles.name}>{item.price}</Text>
            </View>

            <View style={styles.flexicons}>
                <View style={styles.flexicons2}>
                    <Ionicons name='location' size={20} color={'#101828'} />
                    <Text style={styles.text}>{item.location}</Text>
                </View>
                <View style={styles.flexicons2}>
                    <FontAwesome name='bed' size={20} color={'#101828'} />
                    <Text style={styles.text}>{item.beds}</Text>
                    <Text style={styles.text}>{t("Bed")}</Text>
                </View>
                <View style={styles.flexicons2}>
                    <FontAwesome name='bath' size={20} color={'#101828'} />
                    <Text style={styles.text}>{item.baths}</Text>
                    <Text style={styles.text}>{t("Bath")}</Text>
                </View>
                {item.pool && (
                    <View style={styles.flexicons2}>
                        <FontAwesome5 name='swimming-pool' size={20} color={'#101828'} />
                        <Text style={styles.text}>{t("Pool")}</Text>
                    </View>
                )}
            </View>

            <View style={styles.btnsflex}>
                <View style={styles.btnhgh}>
                    <Text style={styles.txt1}>{t("High Demand")}</Text>
                </View>
                <View style={styles.btnhgh2}>
                    <Text style={styles.txt2}>{item.percentage}</Text>
                    <Text style={styles.txt2}>{t("Commission")}</Text>
                </View>
            </View>

            <View style={styles.line} />
            <View style={styles.flexlast}>
                <Text style={styles.txt4}>{t("Completion")}</Text>
                <View style={styles.line2} />
                <Text style={styles.txt3}>{item.completionDate}</Text>
            </View>
            <View style={styles.line} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <FlatList
                data={cardData}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.mainContainer}>
                        <View style={styles.flex}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.back}>
                                <Entypo name='chevron-left' color={'#000'} size={25} />
                            </TouchableOpacity>
                            <Text style={styles.Contact}>{t("Recommendations")}</Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default Recommendations;
const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
        marginHorizontal: 15,
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
        gap: 250,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    flexbtn: {
        width: 65,
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
        gap: 5
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
    }
})