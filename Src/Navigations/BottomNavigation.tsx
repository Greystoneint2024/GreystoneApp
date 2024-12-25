import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Screens/BottomScreens/Home';
import Alert from '../Screens/BottomScreens/Alert';
import Favorites from '../Screens/BottomScreens/Favorites';
import Contact from '../Screens/BottomScreens/Contact';
import Account from '../Screens/BottomScreens/Account';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllAgents from '../Screens/Chat Screens/AllAgents';
interface IconProps {
    name: string;
    size: number;
    color: string;
}

const BottomNavigation: React.FC = ({ data }: any) => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let AlrtIcon;
                    let FavIcon;
                    let ChatIcon;
                    let AccountIcon;
                    if (route.name === 'Search') {
                        iconName = focused ? 'search1' : 'search1';
                        if (color === 'Home') {
                            ('#00AFEF');
                        } else '#9E9E9E';
                    } else if (route.name === 'Alert') {
                        AlrtIcon = focused ? 'bell' : 'bell';
                    } else if (route.name === 'Favorites') {
                        FavIcon = focused ? 'heart' : 'heart';
                    } else if (route.name === 'Contact') {
                        ChatIcon = focused
                            ? 'call'
                            : 'call';
                    } else if (route.name === 'Account') {
                        AccountIcon = focused ? 'account-circle' : 'account-circle';
                    }
                    return (
                        <>
                            <AntDesign
                                // @ts-ignore
                                name={iconName}
                                size={25}
                                color={color}
                                style={{ position: 'absolute' }}
                            />
                            <MaterialCommunityIcons
                                // @ts-ignore
                                name={AlrtIcon}
                                size={25}
                                color={color}
                                style={{ position: 'absolute' }}
                            />
                            <AntDesign
                                // @ts-ignore
                                name={FavIcon}
                                size={25}
                                color={color}
                                style={{ position: 'absolute' }}
                            />
                            <Ionicons
                                // @ts-ignore
                                name={ChatIcon}
                                size={25}
                                color={color}
                                style={{ position: 'absolute' }}
                            />
                            <MaterialCommunityIcons
                                // @ts-ignore
                                name={AccountIcon}
                                size={25}
                                color={color}
                                style={{ position: 'absolute' }}
                            />
                        </>
                    );
                },
                tabBarActiveTintColor: '#101828',
                tabBarInactiveTintColor: '#C8C5C5',
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                    height: 70,
                    position: 'absolute',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,
                },
            })}>
            <Tab.Screen name="Search" component={Home} />
            <Tab.Screen name="Alert" component={Alert} />
            <Tab.Screen
                name="Favorites"
                children={() => <Favorites data={data} />}
            />
            {/* <Tab.Screen name="Favorites" component={Favorites} /> */}
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="Account" component={Account} />
            <Tab.Screen
                options={{
                    tabBarItemStyle: {
                        display: 'none',
                    },
                }}
                name="AllAgents"
                component={AllAgents}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
