import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../DarkMode/LanguageContext';
import { useTheme } from '../../DarkMode/ThemeContext';
import { translations } from '../../translations';

const LanguageScreen = () => {
    const { language, setLanguage } = useLanguage();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <TouchableOpacity 
                style={[styles.languageButton, { 
                    backgroundColor: language === 'en' ? theme.primary : theme.backgroundColor,
                    borderColor: theme.primary
                }]} 
                onPress={() => setLanguage('en')}
            >
                <Text style={[styles.buttonText, { color: language === 'en' ? theme.backgroundColor : theme.textColor }]}>
                    English
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.languageButton, { 
                    backgroundColor: language === 'ar' ? theme.primary : theme.backgroundColor,
                    borderColor: theme.primary
                }]} 
                onPress={() => setLanguage('ar')}
            >
                <Text style={[styles.buttonText, { color: language === 'ar' ? theme.backgroundColor : theme.textColor }]}>
                    العربية
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageButton: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LanguageScreen;