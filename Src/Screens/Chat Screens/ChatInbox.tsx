import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    Alert,
    Modal,
    TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ChatInboxProps {
    route: { params?: { senderImage?: any; senderName?: string } };
}

const ChatInbox: React.FC<ChatInboxProps> = ({ route }) => {
    const navigation = useNavigation();
    const senderImage = route.params?.senderImage || require('../../Assets/Images/d2.jpg');
    const senderName = route.params?.senderName || 'Leonor';
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    interface Message {
        id: string;
        text: string;
        senderImage: any;
        senderName: string;
        isUserMessage: boolean;
        timestamp: string;
    }

    const sendMessage = () => {
        if (inputText.trim() !== '') {
            const newMessage: Message = {
                id: Math.random().toString(),
                text: inputText.trim(),
                senderImage: senderImage,
                senderName: senderName,
                isUserMessage: true,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputText('');
            simulateReceivedMessage();
        }
    };

    const simulateReceivedMessage = () => {
        const receivedMessage: Message = {
            id: Math.random().toString(),
            text: "Hey, I just got your message!",
            senderImage: senderImage,
            senderName: senderName,
            isUserMessage: false,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    const deleteMessage = (id: string) => {
        const updatedMessages = messages.filter((message) => message.id !== id);
        setMessages(updatedMessages);
    };

    const handleLongPress = (item: Message) => {
        Alert.alert(
            'Delete Message',
            'Are you sure you want to delete this message?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteMessage(item.id) },
            ],
            { cancelable: true }
        );
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderChatItem = ({ item }: { item: Message }) => {
        const isDocument = item.text.endsWith('.pdf') || item.text.endsWith('.docx') || item.text.endsWith('.xlsx');

        return (
            <TouchableOpacity
                style={[
                    styles.messageContainer,
                    item.isUserMessage ? styles.userMessageContainer : styles.senderMessageContainer
                ]}
                onLongPress={() => handleLongPress(item)}
            >
                <View style={styles.messageHeader}></View>
                <View
                    style={[
                        styles.messageBubble,
                        { backgroundColor: item.isUserMessage ? '#e2e3e4' : '#000' },
                    ]}
                >
                    {isDocument ? (
                        <Text
                            style={[styles.messageText, { color: item.isUserMessage ? '#3B3A3A' : '#FFF' }]}
                            onPress={() => console.log(`Opening document: ${item.text}`)}
                        >
                            📄 {item.text}
                        </Text>
                    ) : (
                        <Text style={[styles.messageText, { color: item.isUserMessage ? '#3B3A3A' : '#FFF' }]}>
                            {item.text}
                        </Text>
                    )}
                    <Text style={styles.timestampText}>{item.timestamp}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const pickDocument = async () => {
        try {
            //@ts-ignore
            const res: DocumentPickerResponse | null = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            if (res) {
                const newMessage: Message = {
                    id: Math.random().toString(),
                    text: res.name || 'Document',
                    senderImage: senderImage,
                    senderName: senderName,
                    isUserMessage: true,
                    timestamp: new Date().toLocaleTimeString(),
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker cancelled');
            } else {
                console.error('Error while picking document', err);
            }
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <View style={styles.navContainer}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.arrowButton}>
                        <Entypo name="chevron-left" size={30} color="#212121" />
                    </TouchableOpacity>
                    <View style={styles.messageHeader}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={senderImage} style={styles.Image} />
                                <View style={styles.onlineDot}></View>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.senderName}>{senderName}</Text>
                                </View>
                                <Text style={styles.status}>Online</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Entypo name='dots-three-vertical' size={20} color={'#101828'} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderChatItem}
            />
            <View style={styles.inputContainerouter}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={openModal}>
                        <FontAwesome name="paperclip" size={23} color="#101828" style={styles.clipIcon} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                        placeholder="Type your message..."
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Feather name="send" color="#101828" size={23} />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableHighlight
                            onPress={closeModal}
                            style={styles.closeButton}
                            underlayColor="transparent"
                        >
                            <FontAwesome name="close" size={20} color="#00AFEF" />
                        </TouchableHighlight>
                        <TouchableOpacity onPress={pickDocument} style={styles.documentPickerButton}>
                            <View style={styles.circle}>
                                <Ionicons name="document-outline" size={20} color="#FFF" />
                            </View>
                            <Text style={styles.documentPickerText}>Select Document</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("FavoriteSelect" as never)}
                            style={styles.documentPickerButton}>
                            <View style={styles.circle}>
                                <MaterialCommunityIcons name="home-city" size={20} color="#FFF" />
                            </View>
                            <Text style={styles.documentPickerText}>Select Property</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    messageContainer: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    messageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },
    senderName: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 12,
        fontWeight: '400',
        color: "#72757A",
    },
    messageBubble: {
        backgroundColor: '#c0c0c0',
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%',
    },
    messageText: {
        color: '#FFF',
    },
    inputContainer: {
        borderWidth: 1,
        width: '100%',
        padding: 5,
        borderRadius: 10,
        borderColor: '#72757A',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainerouter: {
        padding: 10,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 8,
    },
    Image: {
        width: 36,
        height: 36,
        borderRadius: 50,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    arrowButton: {
        marginTop: 5,
    },
    schedulesText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212121',
    },
    clipIcon: {
        marginRight: 10,
    },
    onlineDot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#23BD33',
        marginTop: 25,
        right: 5,
        width: 'auto',
        flexDirection: 'column',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    circle: {
        width: 30,
        height: 30,
        backgroundColor: '#101828',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentPickerButton: {
        flexDirection: 'row',
        marginVertical: 10,
        gap: 10,
    },
    documentPickerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00000',
        textAlign: 'center',
        marginTop: 5,
    },
    userMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    senderMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    timestampText: {
        fontSize: 10,
        color: '#888',
        textAlign: 'right',
        marginTop: 4,
    },
});

export default ChatInbox;