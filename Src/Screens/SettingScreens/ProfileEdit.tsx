import React, { useState, useEffect } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    PixelRatio,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from "react-native-image-crop-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../BaseUrl';
import { useToast } from 'react-native-toast-notifications';
axios.defaults.baseURL = baseURL;


const { width } = Dimensions.get('window');
const scaleFont = (size: number) => size * PixelRatio.getFontScale();
const scaleSize = (size: number) => (width / 375) * size;


interface DateInputProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
}

//@ts-ignore
const DateInput = ({ value, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event: any, selectedDate: any) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View style={styles.dateInputContainer}>
            <TextInput
                style={styles.inputWithIcon}
                value={value ? value.toLocaleDateString() : ''}
                editable={false}
                placeholderTextColor={"#8A8A8A"}
            />
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.calendarIcon}>
                <AntDesign name="calendar" size={scaleFont(20)} color="#000" />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

const ProfileEdit: React.FC = () => {
    const navigation = useNavigation();
    const [dateOfBirth, setdateOfBirth] = useState<Date | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState<CountryCode>('FR');
    const [country, setCountry] = useState<Country | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();
    const toast = useToast();

    useEffect(() => {
        requestPermission();
        getCurrentUser;
    }, []);

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: "Photo Access",
                        message: "App needs access to your photos to update your profile picture",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };


    const [file, setFile] = useState('');
    // console.log(file);
    const pickPicture = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                setAvatarUri(image.path);
                //@ts-ignore
                setFile(image);
                //@ts-ignore
                onChange?.(image);
            })
            .catch(error => {
                console.log('ImagePicker Error: ', error);
            });
    };
    const onSelectCountry = (selectedCountry: Country) => {
        setCountryCode(selectedCountry.cca2);
        setCountry(selectedCountry);
        setIsVisible(false);
    };
    const [data, setdata] = useState([])
    const getCurrentUser = () => {
        AsyncStorage.getItem('accessToken')
            .then(accessToken => {
                if (accessToken) {
                    return axios.get('/users/getCurrentUser', {
                        headers: {
                            'Content-Type': 'application/json',
                            accessToken
                        },
                    });
                } else {
                    console.log('No access token found');
                    return Promise.reject('No access token found');
                }
            })
            .then(response => {
                const userData = response?.data?.data;
                setName(userData?.name || '');
                setEmail(userData?.email || '');
                setContactNumber(userData?.contactNumber || '');
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
                toast.show('Failed to load user data', { type: 'danger' });
            });
    };

    useEffect(() => {
        getCurrentUser();
    }, []);
    const saveProfile = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('image', {
                //@ts-ignore
                uri: file.path,
                //@ts-ignore
                type: file.mime,
                //@ts-ignore
                name: file.path?.split('/')?.pop(),
            });
            formData.append('name', name);
            formData.append('email', email);
            formData.append('contactNumber', contactNumber);
            formData.append('dateOfBirth', dateOfBirth ? dateOfBirth.toISOString() : '');

            await axios.put(`${baseURL}/users/updateUser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    accessToken,
                },
            });
            toast.show('Profile updated successfully', { type: 'success' });
            navigation.navigate('Account' as never);
        } catch (err) {
            //@ts-ignore
            const errorMessage = err?.response?.data?.message || err.message || 'An error occurred';
            toast.show(errorMessage, { type: 'danger', dangerColor: '#f66' });
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Account" as never)}
                            style={styles.back}
                        >
                            <Entypo name="chevron-left" color={'#000'} size={scaleFont(25)} />
                        </TouchableOpacity>
                        <Text style={styles.Contact}>{t('Profile')}</Text>
                    </View>
                    <View style={styles.container}>
                        {avatarUri ? (
                            <TouchableOpacity onPress={pickPicture}>
                                <Image source={{ uri: avatarUri }} style={styles.avatar} />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.placeholder}>
                                <Image
                                    style={styles.img}
                                    source={require("./../../Assets/Images/pic.png")}
                                />
                                <TouchableOpacity onPress={pickPicture}>
                                    <View style={styles.Icon}>
                                        <MaterialCommunityIcons name="camera-plus" size={scaleFont(16)} color={"#FFF"} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <Text style={styles.name}>{data?.name}</Text>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>{t('Name')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Name"
                            value={name}
                            onChangeText={text => setName(text)}
                            placeholderTextColor={'#667085'}
                        />
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>{t('Email')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholderTextColor={'#667085'}
                        />
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>{t('Phone number')}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter Phone Number"
                            value={contactNumber}
                            onChangeText={text => setContactNumber(text)}
                            placeholderTextColor={'#667085'}
                        />
                    </View>
                    <Text style={styles.birthltxt}>{t('Date of Birth')}</Text>
                    <View style={styles.email}>
                        <DateInput value={dateOfBirth} onChange={setdateOfBirth} />
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.emailtxt}>{t('Country')}</Text>
                        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.countryContainer}>
                            {country && country.flag && (
                                <View style={styles.flagAndCountry}>
                                    <Image source={{ uri: country.flag }} style={styles.flag} />
                                    <Text style={styles.countryText}>{country.name || ''}</Text>
                                </View>
                            )}
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag={false}
                                withAlphaFilter
                                withCallingCode={false}
                                withEmoji
                                onSelect={onSelectCountry}
                                visible={isVisible}
                                onClose={() => setIsVisible(false)}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={saveProfile}
                        style={styles.logbtn}>
                        <Text style={styles.logintxt}>{t('Save Changes')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileEdit;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: scaleSize(20),
        marginHorizontal: scaleSize(15),
        backgroundColor: '#FFFF',
    },
    back: {
        height: scaleSize(35),
        width: scaleSize(35),
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    Contact: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#344054',
    },
    container: {
        marginTop: scaleSize(5),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: scaleSize(120),
        width: scaleSize(120),
        borderRadius: scaleSize(100),
    },
    avatar: {
        width: scaleSize(100),
        height: scaleSize(100),
        borderRadius: scaleSize(50),
    },
    placeholder: {
        width: scaleSize(100),
        height: scaleSize(100),
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        height: scaleSize(100),
        width: scaleSize(100),
        borderRadius: scaleSize(100),
    },
    Icon: {
        width: scaleSize(25),
        height: scaleSize(25),
        borderRadius: scaleSize(50),
        backgroundColor: "#101828",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: scaleSize(15),
        left: scaleSize(30),
    },
    name: {
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: scaleSize(10),
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#344054',
    },
    email: {
        marginTop: scaleSize(15)
    },
    input: {
        width: '100%',
        height: scaleSize(45),
        fontSize: scaleFont(16),
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: scaleSize(20),
        borderColor: '#D0D5DD',
        color: '#000'
    },
    emailtxt: {
        marginBottom: scaleSize(5),
        fontSize: scaleFont(14),
        color: '#344054',
        fontWeight: '500',
    },
    birthltxt: {
        marginTop: scaleSize(10),
        fontSize: scaleFont(16),
        color: '#344054',
    },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    inputWithIcon: {
        width: '100%',
        height: scaleSize(45),
        fontSize: scaleFont(16),
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: scaleSize(20),
        borderColor: '#D0D5DD',
    },
    calendarIcon: {
        position: 'absolute',
        right: scaleSize(15),
    },
    countryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: scaleSize(20),
        height: scaleSize(45),
        borderColor: '#D0D5DD',
        backgroundColor: 'white',
    },
    flagAndCountry: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        width: scaleSize(20),
        height: scaleSize(20),
        marginRight: scaleSize(10),
    },
    countryText: {
        fontSize: scaleFont(16),
        color: '#344054',
    },
    logbtn: {
        width: "100%",
        height: scaleSize(50),
        backgroundColor: '#101828',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: scaleSize(20),
        marginBottom: scaleSize(30),
    },
    logintxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: scaleFont(18),
    }
});
