import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');
const scaleSize = (size: number) => (width / 375) * size;
const scaleFont = (size: number) => (width / 375) * size;

const HowItsWorks = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
        }}>
            <ScrollView>
                <View>
                    <View style={styles.flex}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.back}>
                            <Entypo name="chevron-left" color={'#000'} size={scaleSize(25)} />
                        </TouchableOpacity>
                        <Text style={styles.changep}>{t('play')}</Text>
                    </View>
                    <Text style={styles.watch}>Watch video if you don’t know where to go.</Text>
                    <View style={styles.videoContainer}>
                        <Video
                            source={require('../../Assets/Videos/v2.mp4')}
                            style={styles.video}
                            controls={true}
                            resizeMode="cover"
                            paused={false}
                            repeat={false}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CustomerAgents" as never)}
                        style={styles.notifybox}>
                        <View style={styles.flexicons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialIcons name='headset-mic' color={'#101828'} size={24} />
                                <Text style={styles.name}>{t('Customer & support')}</Text>
                            </View>
                            <Feather name='chevron-right' color={'#101828'} size={24} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: scaleSize(20),
        backgroundColor: '#FFFF',
    },
    back: {
        height: scaleSize(40),
        width: scaleSize(40),
        marginHorizontal: scaleSize(15),
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changep: {
        alignSelf: 'center',
        fontSize: scaleFont(18),
        fontWeight: '500',
        marginBottom: scaleSize(20),
        marginTop: scaleSize(20),
        color: '#344054',
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: scaleSize(10),
    },
    watch: {
        fontSize: scaleFont(14),
        fontWeight: '400',
        color: '#344054',
        textAlign: 'center',
    },
    videoContainer: {
        marginTop: scaleSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    video: {
        width: width * 0.9,
        height: width * 0.5,
        borderRadius: 20,
    },
    notifybox: {
        marginVertical: 10,
        width: '90%',
        height: 50,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#D0D5DD',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#101828',
    }
});

export default HowItsWorks;
