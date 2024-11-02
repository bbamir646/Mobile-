import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
  Animated,
  Keyboard,
  Platform,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';

export const HealthRecordsScreen = () => {
  const { theme } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();
  const isLightTheme = theme === 'light';
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef();

  const typingAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const t = translations[currentLanguage].chantai;

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'ckb', name: 'Kurdish-Sorani', nativeName: 'کوردی-سۆرانی' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        scrollToBottom();
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const toggleLanguageModal = () => {
    setIsLanguageModalVisible(!isLanguageModalVisible);
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsLanguageModalVisible(false);
  };

  const startTypingAnimation = () => {
    setIsTyping(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(typingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(typingAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const stopTypingAnimation = () => {
    setIsTyping(false);
    typingAnimation.stopAnimation();
    typingAnimation.setValue(0);
  };

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      scrollToBottom();
      
      startTypingAnimation();
      
      setTimeout(() => {
        stopTypingAnimation();
        setMessages(prev => [...prev, { 
          text: t.aiResponse, 
          isUser: false 
        }]);
        scrollToBottom();
      }, 2000);
    }
  };

  // Add handler for Enter key
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
      sendMessage();
      return true;
    }
    return false;
  };

  return (
    <View style={[styles.container, { backgroundColor: isLightTheme ? '#fff' : '#1A1A1A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isLightTheme ? '#fff' : '#1A1A1A' }]}>
        <Pressable onPress={toggleHistory} style={styles.menuButton}>
          <Icon 
            name="menu" 
            size={24} 
            color={isLightTheme ? '#1a73e8' : '#64B5F6'} 
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isLightTheme ? '#1a73e8' : '#64B5F6' }]}>
          ChantAI
        </Text>
        <Pressable onPress={toggleLanguageModal} style={styles.languageButton}>
          <Icon 
            name="translate" 
            size={24} 
            color={isLightTheme ? '#1a73e8' : '#64B5F6'} 
          />
        </Pressable>
      </View>

      {/* Chat Container */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={[
          styles.chatContent,
          { paddingBottom: keyboardHeight > 0 ? keyboardHeight : 90 }
        ]}
        onContentSizeChange={() => scrollToBottom(false)}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon 
              name="robot" 
              size={100} 
              color={isLightTheme ? '#1a73e8' : '#64B5F6'}
              style={styles.robotIcon}
            />
            <Text style={[
              styles.emptyText,
              { color: isLightTheme ? '#666' : '#aaa' }
            ]}>
              {t.startConversation}
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <Animated.View 
              key={index} 
              entering={Animated.spring({ velocity: 10 })}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.aiMessage,
                { 
                  backgroundColor: isLightTheme 
                    ? (message.isUser ? '#1a73e8' : '#fff')
                    : (message.isUser ? '#64B5F6' : '#2A2A2A')
                }
              ]}
            >
              <Text style={[
                styles.messageText,
                { color: message.isUser ? '#fff' : (isLightTheme ? '#000' : '#fff') }
              ]}>
                {message.text}
              </Text>
            </Animated.View>
          ))
        )}
        {isTyping && (
          <Animated.View 
            style={[
              styles.typingIndicator,
              { 
                backgroundColor: isLightTheme ? '#fff' : '#2A2A2A',
                transform: [{ 
                  translateY: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                  })
                }]
              }
            ]}
          >
            <Text style={{ color: isLightTheme ? '#1a73e8' : '#64B5F6' }}>
              ChatAI is typing...
            </Text>
          </Animated.View>
        )}
      </ScrollView>

      {/* Input Container - Updated positioning */}
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: isLightTheme ? '#fff' : '#2A2A2A',
        }
      ]}>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isLightTheme ? '#f5f5f5' : '#1A1A1A',
              color: isLightTheme ? '#000' : '#fff'
            }
          ]}
          placeholder={t.typePlaceholder}
          placeholderTextColor={isLightTheme ? '#666' : '#aaa'}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <Pressable 
          onPress={sendMessage}
          style={[
            styles.sendButton,
            { opacity: inputText.trim() ? 1 : 0.5 }
          ]}
        >
          <Icon 
            name="send" 
            size={24} 
            color={isLightTheme ? '#1a73e8' : '#64B5F6'} 
          />
        </Pressable>
      </View>

      {/* Modals */}
      <Modal
        visible={isHistoryVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleHistory}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleHistory}>
          <View style={[styles.historyModal, { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }]}>
            <Text style={[styles.historyTitle, { color: isLightTheme ? '#1a73e8' : '#64B5F6' }]}>
              {t.chatHistory}
            </Text>
            <ScrollView>
              <Text style={{ color: isLightTheme ? '#666' : '#aaa' }}>
                {t.noHistory}
              </Text>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={isLanguageModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleLanguageModal}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleLanguageModal}>
          <View style={[styles.languageModal, { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }]}>
            {languages.map((language) => (
              <Pressable
                key={language.code}
                style={[styles.languageItem, { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <Text style={[styles.languageName, { color: isLightTheme ? '#000' : '#fff' }]}>
                  {language.name}
                </Text>
                <Text style={[styles.nativeName, { color: isLightTheme ? '#666' : '#aaa' }]}>
                  {language.nativeName}
                </Text>
                {currentLanguage === language.code && (
                  <Icon name="check" size={24} color="#1a73e8" />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyModal: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 90,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(26, 115, 232, 0.1)',
  },
  languageButton: {
    padding: 8,
    position: 'absolute',
    right: 16,
  },
  languageModal: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  robotIcon: {
    marginBottom: 20,
    opacity: 0.9,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
});