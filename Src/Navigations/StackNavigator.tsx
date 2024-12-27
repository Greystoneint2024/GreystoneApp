import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import { useNavigation } from '@react-navigation/native';
import Login from '../Screens/Auth Screens/Login';
import Signup from '../Screens/Auth Screens/Signup';
import ForgetScreen from '../Screens/Auth Screens/ForgetScreen';
import ChangePass from '../Screens/Auth Screens/ChangePass';
import EmailSubmit from '../Screens/Auth Screens/EmailSubmit';
import OtpScreen from '../Screens/Auth Screens/OtpScreen';
import BottomNavigation from './BottomNavigation';
import ProfileEdit from '../Screens/SettingScreens/ProfileEdit';
import UpdatePassword from '../Screens/SettingScreens/UpdatePassword';
import AboutUs from '../Screens/SettingScreens/AboutUs';
import SearchHistory from '../Screens/SettingScreens/SearchHistory';
import TermsService from '../Screens/SettingScreens/TermsService';
import ViewedHistory from '../Screens/SettingScreens/ViewedHistory';
import Recommendations from '../Screens/SettingScreens/Recommendations';
import Languages from '../Screens/SettingScreens/Languages';
import MortgageResult from '../Screens/StackScreens/MortgageResult'
import FilterScreens from '../Screens/StackScreens/FilterScreens';
import MortgageCalculator from '../Screens/StackScreens/MortgageCalculator';
import HomeCards from '../Screens/StackScreens/HomeCards';
import PropertyDetail from '../Screens/StackScreens/PropertyDetail';
import ChatInbox from '../Screens/Chat Screens/ChatInbox';
import CustomerAgents from '../Screens/Chat Screens/Customer Support/CustomerAgents';
import HowItsWorks from '../Screens/SettingScreens/HowItsWorks';
import MapScreen from '../Screens/StackScreens/MapView';
import ChatInboxFaq from '../Screens/Chat Screens/Customer Support/ChatIboxFaq';
import FavoriteSelect from '../Screens/StackScreens/FavoriteSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../BaseUrl';
import Account from '../Screens/BottomScreens/Account';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2.10000000);
    }, []);

    const [data, setData] = useState([])
    const fetchData = async () => {
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId, 'usesasrid')

        try {
            const response = await axios.get(`${baseURL}/Favoritlistes/getFavoritesByUserId/${userId}`);
            setData(response.data?.favorites);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(data, 'data')

    }, []);

    return loading ? (
        <SplashScreen />
    ) : (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        // initialRouteName="SplashScreen"
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
            <Stack.Screen name="EmailSubmit" component={EmailSubmit} />
            <Stack.Screen name="ChangePass" component={ChangePass} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="BottomNavigation">
                {() => <BottomNavigation data={data} />}
            </Stack.Screen>
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="SearchHistory" component={SearchHistory} />
            <Stack.Screen name="TermsService" component={TermsService} />
            <Stack.Screen name="ViewedHistory" component={ViewedHistory} />
            <Stack.Screen name="Recommendations" component={Recommendations} />
            <Stack.Screen name="Languages" component={Languages} />
            <Stack.Screen name="FilterScreens" component={FilterScreens} />
            <Stack.Screen name="MortgageCalculator" component={MortgageCalculator} />
            <Stack.Screen name="MortgageResult" component={MortgageResult} />
            <Stack.Screen name="HomeCards">
                {() => <HomeCards
                    //@ts-ignore
                    Favdata={data} fetchFavData={fetchData} navigation={undefined} />}
            </Stack.Screen>
            <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
            <Stack.Screen name="ChatInbox" component={ChatInbox} />
            <Stack.Screen name="ChatInboxFaq" component={ChatInboxFaq} />
            <Stack.Screen name="CustomerAgents" component={CustomerAgents} />
            <Stack.Screen name="HowItsWorks" component={HowItsWorks} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="FavoriteSelect" component={FavoriteSelect} />

        </Stack.Navigator>
    );
};

export default StackNavigation;
