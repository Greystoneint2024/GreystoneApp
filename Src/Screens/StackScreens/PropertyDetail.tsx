import { ScrollView, TouchableOpacity, Linking, StyleSheet, Text, View, ImageBackground, StatusBar, Image, FlatList, Modal, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../BaseUrl';

type CardData = {
    PropertyName: string;
    price: number;
    cadastralReference: string;
    area: string;
    bedroom: number;
    bathroom: number;
    pool?: boolean;
    propertyType: string;
    built: number;
    plot: number;
    condition: string;
    PropertyHealthScore: number;
    useableSpace: number;
    features: string[];
    description: string;
    image: string;
};

const imageData = [
    { id: '1', source: require('../../Assets/Images/hotel.png') },
    { id: '2', source: require('../../Assets/Images/d.jpg') },
    { id: '3', source: require('../../Assets/Images/d2.jpg') },
    { id: '4', source: require('../../Assets/Images/d3.jpg') },
    { id: '5', source: require('../../Assets/Images/hotel.png') },
    { id: '6', source: require('../../Assets/Images/pic.png') }
];
const PropertyDetail = () => {
    const [selectedButton, setSelectedButton] = useState('All');
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleTextLayout = (e: { nativeEvent: { lines: string | any[]; }; }) => {
        const lines = e.nativeEvent.lines.length;
        if (lines > 2) {
            setIsTruncated(true);
        }
    };
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const phoneNumber = '+1234567890';
    const recipientEmail = 'example@example.com';
    const emailSubject = 'Hello, I have a question';
    const emailBody = 'Hi, I would like to know more about...';


    const makeCall = () => {
        if (Platform.OS === 'ios') {
            Alert.alert("Warning", "Cannot make a call on iOS Simulator. Test on a real device.");
        } else {
            Linking.openURL(`tel:${phoneNumber}`)
                .catch(err => console.error('Failed to open dialer:', err));
        }
    };

    const openWhatsApp = () => {
        const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
        Linking.canOpenURL(whatsappURL)
            .then(supported => {
                if (supported) {
                    Linking.openURL(whatsappURL);
                } else {
                    Alert.alert('WhatsApp is not installed on this device.');
                }
            })
            .catch(err => {
                console.error('Failed to check WhatsApp installation:', err);
            });
    };
    const openEmailClient = () => {
        const mailToURL = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        Linking.canOpenURL(mailToURL)
            .then(supported => {
                if (supported) {
                    Linking.openURL(mailToURL);
                } else {
                    Alert.alert('No email client available on this device.');
                }
            })
            .catch(err => console.error('Failed to open email client:', err));
    };

    const [currentImage, setCurrentImage] = useState({ id: '1', source: require('../../Assets/Images/hotel.png') })

    const handleSignOut = () => {
        setShowModal(true);
    };
    const handleShare = () => {
        setShowModal2(true);
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            setCurrentImage(item)
        }} style={styles.imagescont}>
            <Image
                source={item.source}
                style={styles.images}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
    const [cardData, setCardData] = useState<CardData | null>(null)
    const fetchData = async () => {
        const listingId = await AsyncStorage.getItem('listingId');
        try {
            const response = await axios.get(`${baseURL}/listings/getbyId/${listingId}`);
            setCardData(response.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(cardData, 'cardDadfta')
    }, []);
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <ScrollView>
                    <ImageBackground
                        source={{
                            uri: `${baseURL}/images/${cardData?.image}`
                        }}
                        style={styles.imgbg}
                    />
                    <View style={styles.flex}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("HomeCards" as never)}
                            style={styles.back}>
                            <Entypo name='chevron-left' color={'#000'} size={25} />
                        </TouchableOpacity>
                        <View style={styles.flex2icon}>
                            <TouchableOpacity>
                                <AntDesign name='hearto' color={'#000'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleShare}
                            >
                                <Feather name='share' color={'#000'} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={imageData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.mainview}>
                        <View style={styles.flexprice}>
                            <Text style={styles.name}>{cardData?.PropertyName}</Text>
                            <Text style={styles.name}>€ {cardData?.price}</Text>
                        </View>
                        <View style={styles.flexref}>
                            <Text style={styles.ref}>{t("Reference:")}</Text>
                            <Text style={styles.ref}>{cardData?.cadastralReference}</Text>
                        </View>
                        <View style={styles.flexicons}>
                            <View style={styles.flexicons2}>
                                <Ionicons name='location' size={20} color={'#101828'} />
                                <Text style={styles.text}>{cardData?.area}</Text>
                            </View>
                            <View style={styles.flexicons2}>
                                <FontAwesome name='bed' size={20} color={'#101828'} />
                                <Text style={styles.text}>{cardData?.bedroom}</Text>
                                <Text style={styles.text}>{t("Bed")}</Text>
                            </View>
                            <View style={styles.flexicons2}>
                                <FontAwesome name='bath' size={20} color={'#101828'} />
                                <Text style={styles.text}>{cardData?.bathroom}</Text>
                                <Text style={styles.text}>{t("Bath")}</Text>
                            </View>
                            {cardData?.pool && (

                                <View style={styles.flexicons2}>
                                    <MaterialCommunityIcons name='pool' size={20} color={'#101828'} />
                                    <Text style={styles.text}>{t("Pool")}</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.line} />
                        <View style={styles.flexlast}>
                            <View style={{ width: '33%' }}>
                                <Text style={styles.txt4p}>{t("HOUSE/APARTMENT TYPE")}</Text>
                                <Text style={styles.txt3}>{cardData.propertyType}</Text>
                            </View>
                            <View style={styles.line2} />
                            <View style={{ width: '33%' }}>
                                <Text style={styles.txt4}>{t("SQUARE METERS")}</Text>
                                <Text style={styles.txt3}>{cardData?.built} </Text>
                            </View>
                            <View style={styles.line2} />
                            <View style={{ width: '33%' }}>
                                <Text style={styles.txt4}>{t("Plot surface")}</Text>
                                <Text style={styles.txt3}>{cardData?.plot}</Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.flexlast}>
                            <View style={{ width: '33%' }}>
                                <Text style={styles.txt4p}>{t("Condition")}</Text>
                                <Text style={styles.txt3}>{cardData.condition}</Text>
                            </View>
                            <View style={styles.line2} />
                            <View style={{ width: '33%' }}>
                                <Text style={styles.txt4}>{t("Property Health Score")}</Text>
                                <Text style={styles.txt3}>{cardData?.PropertyHealthScore} </Text>
                            </View>
                            <View style={styles.line2} />
                            <View style={{ width: '33%' }}>
                                <Text style={styles.txt4}>{t("UseableSpace")}</Text>
                                <Text style={styles.txt3}>{cardData?.useableSpace}</Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.Discription}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text style={styles.Discripmain}>Features:</Text>
                            <Text style={styles.Discriptxt}>{cardData?.features?.join(', ')}</Text>
                        </View>
                        <Text style={styles.Discripmain}>Near by:</Text>
                        <Text style={styles.Discriptxt}>Hospitals: Hospital Costa del Sol, 50meters Walking distance west</Text>
                        <Text style={styles.Discriptxt}>Schools: Elementary Primary School Costa del Sol, 80meters East.</Text>
                        <Text style={styles.Discripmain}>Discription:</Text>
                        <Text
                            style={styles.Discriptxt}
                            numberOfLines={showFullDescription ? undefined : 3}
                            onTextLayout={handleTextLayout}
                        >
                            {cardData?.description}
                        </Text>
                        {isTruncated && (
                            <TouchableOpacity style={styles.readmore} onPress={toggleDescription}>
                                <Text style={styles.readmoretxt}>
                                    {showFullDescription ? 'Read Less' : 'Read More'}
                                </Text>
                                <Feather
                                    name={showFullDescription ? 'chevron-up' : 'chevron-down'}
                                    size={22}
                                    color={'#4a4a4a'}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.downbtn}>
                        <Text style={styles.downtxt}>{t("Download Information")}</Text>
                        <Feather name='download' size={25} color={'#fff'} />
                    </TouchableOpacity>
                    <View style={styles.flexunit}>
                        <Text style={styles.unittxt}>12</Text>
                        <Text style={styles.unittxt} >{t("Units Available")}</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                        <View style={styles.fourflex}>
                            <TouchableOpacity
                                style={[styles.btnall, selectedButton === 'All' && styles.selectedButton]}
                                onPress={() => setSelectedButton('All')}
                            >
                                <Text style={[styles.btnalltext, selectedButton === 'All' && styles.selectedButtonText]}>{t("All")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnall2, selectedButton === 'For Sale' && styles.selectedButton]}
                                onPress={() => setSelectedButton('For Sale')}
                            >
                                <Text style={[styles.btnalltext2, selectedButton === 'For Sale' && styles.selectedButtonText]}>Damac Riverside IVY (09)</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnall2, selectedButton === 'For Rent' && styles.selectedButton]}
                                onPress={() => setSelectedButton('For Rent')}
                            >
                                <Text style={[styles.btnalltext2, selectedButton === 'For Rent' && styles.selectedButtonText]}>Damac Riverside IVY</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnall2, selectedButton === 'Projects' && styles.selectedButton]}
                                onPress={() => setSelectedButton('Projects')}
                            >
                                <Text style={[styles.btnalltext2, selectedButton === 'Projects' && styles.selectedButtonText]}>{t("Projects")}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.cardcont}>
                            <View style={{ padding: 10 }}>
                                <Text style={styles.cardhead}>ADE 34,578,793</Text>
                                <Text style={styles.cardhead2}>DRSSGE/SD353/BS4532</Text>
                                <Text style={styles.cardhead3}>DAMAC RIVERSIDE-SAGE</Text>
                            </View>
                            <View style={styles.cardflex}>
                                <View style={styles.tag}>
                                    <AntDesign name='tags' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>AED 52,532/SqFt</Text>
                                </View>
                                <View style={styles.tag2}>
                                    <Feather name='image' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>6BR</Text>
                                </View>
                            </View>
                            <View style={styles.cardflex}>
                                <View style={styles.tag}>
                                    <Feather name='image' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>4,532/SqFt</Text>
                                </View>
                                <View style={styles.tag2}>
                                    <MaterialCommunityIcons name='bed-king-outline' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>6BR</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardcont}>
                            <View style={{ padding: 10 }}>
                                <Text style={styles.cardhead}>ADE 34,578,793</Text>
                                <Text style={styles.cardhead2}>DRSSGE/SD353/BS4532</Text>
                                <Text style={styles.cardhead3}>DAMAC RIVERSIDE-SAGE</Text>
                            </View>
                            <View style={styles.cardflex}>
                                <View style={styles.tag}>
                                    <AntDesign name='tags' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>AED 52,532/SqFt</Text>
                                </View>
                                <View style={styles.tag2}>
                                    <Feather name='image' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>6BR</Text>
                                </View>
                            </View>
                            <View style={styles.cardflex}>
                                <View style={styles.tag}>
                                    <Feather name='image' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>4,532/SqFt</Text>
                                </View>
                                <View style={styles.tag2}>
                                    <MaterialCommunityIcons name='bed-king-outline' size={20} color={'#fff'} />
                                    <Text style={styles.tagtxt}>6BR</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Text style={styles.location}>{t("Location")}</Text>
                    <View style={styles.mapviewcon}>
                        <Image style={styles.imgmap} source={require('../../Assets/Images/mapview.png')} />
                    </View>
                    <TouchableOpacity
                        //@ts-ignore
                        onPress={() => navigation.navigate("MortgageCalculator")}
                        style={styles.downbtn}>
                        <Text style={styles.downtxt}>{t("Mortgage Calculator")}</Text>
                    </TouchableOpacity>
                    {/* Enquire modal */}
                    <TouchableOpacity
                        onPress={handleSignOut}
                        style={styles.downbtn}>
                        <Text style={styles.downtxt}>{t("Enquire Now")}</Text>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showModal}
                        animationType='slide'
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    style={styles.crossbtn}
                                    onPress={() => setShowModal(false)}>
                                    <Entypo name='cross' size={25} color={'#000'} />
                                </TouchableOpacity>
                                <Text style={styles.modalText}>{t("Enquire Now")}</Text>
                                <Image source={require('../../Assets/Logo/logo1.png')} style={styles.modalImage} />
                                <Text style={styles.modalText2}>Giles Group</Text>
                                <Text style={styles.modalText3}>Douglas Elliman Real Estate</Text>
                                <View style={styles.shareicons}>
                                    <TouchableOpacity
                                        onPress={openEmailClient}
                                        style={styles.box}>
                                        <Feather name='mail' size={21} color={'#767676'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={makeCall}
                                        style={styles.box}>
                                        <Ionicons name='call-outline' size={21} color={'#767676'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={openWhatsApp}
                                        style={styles.box}>
                                        <FontAwesome name='whatsapp' size={21} color={'#767676'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {/* share modal */}
                    <Modal
                        transparent={true}
                        visible={showModal2}
                        animationType="fade"
                        onRequestClose={() => setShowModal2(false)}>
                        <View style={styles.fullScreenModal}>
                            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    style={styles.crossbtn}
                                    onPress={() => setShowModal2(false)}>
                                    <Entypo name='cross' size={25} color={'#000'} />
                                </TouchableOpacity>
                                <Text style={styles.modalText22}>Share</Text>
                                <View style={styles.flexlink}>
                                    <TouchableOpacity style={styles.copy}>
                                        <AntDesign name='pdffile1' size={20} color={'#fff'} />
                                        <Text style={styles.copytxt}>Download PDF File</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </>
    );
};

export default PropertyDetail;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
        flex: 1,
        marginTop: 10,
        backgroundColor: '#FFFF',
    },
    imgbg: {
        width: '100%',
        height: 335,
        resizeMode: 'cover',
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
        gap: 280,
        justifyContent: 'space-between',
        position: 'absolute',
        marginTop: 50,
        marginHorizontal: 20
    },
    flex2icon: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    imagesscroll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 5,
        marginHorizontal: 10
    },
    flexprice: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    name: {
        color: '#292929',
        fontSize: 18,
        fontWeight: '700',
    },
    flexref: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    ref: {
        fontSize: 14,
        fontWeight: '500',
        color: '#888888',
    },

    flexicons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    flexicons2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
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
        height: 35,
        width: 1,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DBDCDF',
        marginHorizontal: 10,
    },
    txt3: {
        fontSize: 16,
        fontWeight: '500',
        // width: '83%',
        color: '#000',
    },
    txt4p: {
        fontSize: 13,
        fontWeight: '600',
        color: '#888888',
    },
    txt4: {
        fontSize: 13,
        fontWeight: '600',
        color: '#888888',
        width: '80%'
    },
    mainview: {
        marginHorizontal: 15,
    },
    Discription: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    Discripmain: {
        color: '#292929',
        fontSize: 18,
        fontWeight: '600',
    },
    Discriptxt: {
        fontSize: 16,
        fontWeight: '400',
        color: '#4d4d4d',
        lineHeight: 22

    },
    readmore: {
        backgroundColor: '#f6f6f6',
        height: 40,
        width: 124,
        alignSelf: 'center',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20
    },
    readmoretxt: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4a4a4a',
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
        width: '90%',
        marginVertical: 5,
    },
    downtxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexunit: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 5
    },
    unittxt: {
        fontSize: 18,
        fontWeight: '500',
        color: '#292929'
    },
    fourflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 10,
        gap: 10
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
    cardcont: {
        marginVertical: 10,
        marginHorizontal: 20,
        width: '80%',
        height: 180,
        backgroundColor: '#ededed',
        borderRadius: 20,
    },
    cardhead: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    cardhead2: {
        fontSize: 16,
        fontWeight: '500',
        color: '#444444'
    },
    cardhead3: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222222'
    },
    tag: {
        height: 35,
        width: '50%',
        backgroundColor: '#101828',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    tag2: {
        height: 35,
        width: '30%',
        backgroundColor: '#101828',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    tagtxt: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
    },
    cardflex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 5,
        paddingLeft: 10
    },
    location: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        marginVertical: 5,
        marginHorizontal: 15
    },
    imgmap: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    imgmap2: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    mapviewcon: {
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: "90%",
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
    modalImage: {
        height: 84,
        width: 80,
        resizeMode: 'contain'
    },
    modalText2: {
        fontSize: 18,
        fontWeight: '500',
        color: '#444444',
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
        marginVertical: 10,
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
    shareicons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginVertical: 20,
        alignSelf: 'center'
    },
    crossbtn: {
        alignSelf: 'flex-end'
    },
    iconpic: {
        width: 30,
        height: 30
    },
    flexlink: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    copytxt: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF'
    },
    fullScreenModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // flexcross: {
    // flexDirection: 'row',
    // alignItems: 'center',
    //     gap: 10
    // },
    copy: {
        height: 40,
        width: '80%',
        gap: 10,
        backgroundColor: '#101828',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagescont: {
        margin: 5,
    },
    images: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
});
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}