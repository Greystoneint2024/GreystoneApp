import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Src/Navigations/StackNavigator';
import './Src/Languages/index';
import 'intl-pluralrules';
import { ToastProvider } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <ToastProvider
        renderType={{
          custom_type: toast => (
            <View style={{ padding: 15, backgroundColor: 'grey', zIndex: 40000 }}>
              <Text style={{ fontSize: 10 }}>{toast.message}</Text>
            </View>
          ),
        }}
        dangerIcon={<MaterialIcons name="error" size={20} color="white" />}
        successIcon={<AntDesign name="check" size={20} color="white" />}
        placement="top"
        duration={3000}
        animationType="zoom-in"
        animationDuration={250}
        successColor="#00AFEF"
        dangerColor="#f66"
        warningColor="orange"
        normalColor="gray"
        textStyle={{ fontSize: 15 }}
        offset={50}
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          // initialRouteName="SelectPanel"
          >
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
        </Stack.Navigator>
      </ToastProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  logo: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});