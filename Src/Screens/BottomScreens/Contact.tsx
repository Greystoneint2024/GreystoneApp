import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


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

const ActiveChat = [
    { id: '1', name: 'Rabika', role: 'Broker', image: require('../../Assets/Images/d.jpg') },
    { id: '2', name: 'Rabika', role: 'Broker', image: require('../../Assets/Images/d2.jpg') },
    { id: '3', name: 'Rabika', role: 'Broker', image: require('../../Assets/Images/d3.jpg') },
    { id: '4', name: 'Rabika', role: 'Broker', image: require('../../Assets/Images/hotel.png') },
];
const RecentChat = [
    { id: '1', name: 'Rabika', time: '12:00 am', role: 'In publishing and graphic...', image: require('../../Assets/Images/d.jpg'), },
    { id: '2', name: 'Rabika', time: '12:00 am', role: 'Broker is done', image: require('../../Assets/Images/d2.jpg') },
    { id: '3', name: 'Rabika', time: '12:00 am', role: 'Broker is going to sell', image: require('../../Assets/Images/d3.jpg') },
    { id: '4', name: 'Rabika', time: '12:00 am', role: 'In publishing and graphic...', image: require('../../Assets/Images/hotel.png') },
];

const lawyerData = [
    {
        id: 1,
        image: require('../../Assets/Images/lig.jpg'),
        name: 'Martinez Echevarria',
        description:
            'Lawyers Marbell Fuengirola Estepona Elviria Benalmadena Maniva Sotogrande. The best legal advice on the Costa del Sol.',
        phone: '+1 555 444 3333',
        email: 'mikael.rolon@martinecharrin.com',
        website: 'https://www.martinecharria.com/',
        job: 'Lawyer',
    },
    {
        id: 2,
        image: require('../../Assets/Images/leg2.png'),
        name: 'Lumon',
        description:
            'Legal experts specializing in real estate, business law, and immigration services on the Costa del Sol.',
        phone: '+1 555 333 2222',
        email: 'john.doe@legalservices.com',
        website: 'https://www.johndoelegal.com/',
        job: 'Currency Exchange',
    },
];

const renderOnline = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.chatbox}>
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
);
const renderRecent = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.recentbox}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <View style={styles.container}>
                <Image
                    source={item.image}
                    style={styles.profilePic}
                />
                <View style={styles.onlineDot} />
            </View>
            <View >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phoneno}>{item.role}</Text>
            </View>
        </View>
        <View style={styles.chattext}>
            <Text style={styles.time}>{item.time}</Text>
        </View>
    </TouchableOpacity>
);
const Contact = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [card, setCard] = useState<CardData | null>(null)
    const fetchData = async () => {
        try {
            const response = await axios.get(`/services/all`);
            setCard(response.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(card, 'cardDadfta')
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.mainContainer}>
                        <Text style={styles.Contact}>{t("Contact")}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txt}>Chat with our live agents 24/7</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AllAgents" as never)}>
                                <Text style={styles.txt2}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={ActiveChat}
                            renderItem={renderOnline}
                            keyExtractor={(item) => item.id}
                        />
                        <View style={styles.linee}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txt}>Recent Chat</Text>
                            <TouchableOpacity>
                                <Text style={styles.txt2}>Sees all</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                data={RecentChat}
                renderItem={renderRecent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListFooterComponent={
                    <View>
                        <Text style={styles.tctSP}>{t("Service providers")}</Text>
                        <View>
                            {
                                //@ts-ignore
                                card.map((card) => (
                                    <View key={card.id} style={styles.newSection}>
                                        <View style={styles.mainflexl}>
                                            <View style={styles.container}>
                                                <Image
                                                    source={card.image} style={styles.profilePic} />
                                            </View>
                                            <View>
                                                <Text style={styles.newHeader}>{card.name}</Text>
                                                <Text style={styles.newHeadpara}>{card.description}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.mainflexl2}>
                                            <Ionicons name="call-outline" size={25} color={'#101828'} />
                                            <Text style={styles.newPhone}>{card.contactNumber}</Text>
                                        </View>
                                        <View style={styles.mainflexl2}>
                                            <Feather name="mail" size={25} color={'#101828'} />
                                            <Text style={styles.newPhone}>{card.email}</Text>
                                        </View>
                                        <View style={styles.mainflexl2}>
                                            <MaterialCommunityIcons name="search-web" size={25} color={'#101828'} />
                                            <Text style={styles.newPhone}>{card.websiteLink}</Text>
                                        </View>
                                        <View style={styles.btnlwyer}>
                                            <Text style={styles.btnlw}>{card.role}</Text>
                                        </View>
                                    </View>
                                ))}
                        </View>
                        {/* Existing Content */}
                        <View style={styles.or}>
                            <Text style={styles.txts}>{t("OR")}</Text>
                            <Text style={styles.txts}>{t("Get in touch")}</Text>
                            <Text style={styles.txts2}>{t("Our friendly team is always here to chat.")}</Text>
                            <Image style={styles.img} source={require('../../Assets/Icons/mes.png')} />
                            <Text style={styles.txts1}>{t("Email")}</Text>
                            <Text style={styles.txts2}>{t("Our friendly team is always here to chat.")}</Text>
                            <Text style={styles.txts}>Hello@realestateagent.com</Text>
                            <Image style={styles.img} source={require('../../Assets/Icons/loc.png')} />
                            <Text style={styles.txts1}>{t("Office")}</Text>
                            <Text style={styles.txts2}>{t("Come say hello at our office.")}</Text>
                            <Text style={styles.txts22}>100 Smith Street Collingwood VIC 3066 AU</Text>
                            <Image style={styles.img} source={require('../../Assets/Icons/call.png')} />
                            <Text style={styles.txts1}>{t("Phone")}</Text>
                            <Text style={styles.txts2}>{t("Mon-Fri from 8am to 5pm.")}</Text>
                            <Text style={styles.txts}>+1 (555) 000-0000</Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>

    )
}

export default Contact

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        marginHorizontal: 15,
        backgroundColor: '#FFFF',
    },
    Contact: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },
    txt: {
        fontSize: 16,
        color: '#212121',
        fontWeight: '600',
        marginTop: 20,
    },
    txt2: {
        fontSize: 16,
        color: '#5500FF',
        fontWeight: '600',
        marginTop: 20,
    },
    or: {
        width: '95%',
        backgroundColor: '#101828',
        borderRadius: 10,
        height: 750,
        marginTop: 10,
        marginBottom: 50,
        alignSelf: 'center'
    },
    txts: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    txts22: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        width: '70%',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
    },
    txts1: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    txts2: {
        fontSize: 16,
        color: '#EAECF0',
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 10,
    },
    img: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20,
    },
    chatbox: {
        width: '100%',
        alignSelf: 'center',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        marginVertical: 5,
        alignItems: 'center',
        paddingLeft: 10,
        gap: 10,
        flexDirection: 'row',
    },
    recentbox: {
        width: '95%',
        alignSelf: 'center',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        marginVertical: 5,
        alignItems: 'center',
        paddingLeft: 10,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    linee: {
        height: 1,
        width: '100%',
        backgroundColor: '#9fa3a9',
        marginTop: 10,
    },
    time: {
        fontSize: 12,
        fontWeight: '500',
        color: '#3B3A3A',
    },
    mainflexl: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10
    },
    tctSP: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        padding: 10
    },
    mainflexl2: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        paddingLeft: 10,
        marginVertical: 5,
    },
    newSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 265,
        borderWidth: 1,
        marginVertical: 5,
        alignSelf: 'center',
        width: '95%',
    },
    newHeader: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    newHeadpara: {
        fontSize: 12,
        fontWeight: '500',
        color: '#72757A',
        // width: '47%',
    },
    newPhone: {
        fontSize: 16,
        fontWeight: '500',
        color: '#101828',
    },
    btnlwyer: {
        width: 160,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnlw: {
        fontSize: 16,
        fontWeight: '500',
        color: '#101828',
    }


});
