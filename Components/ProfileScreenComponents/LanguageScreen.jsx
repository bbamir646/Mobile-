import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { useLanguage } from '../../DarkMode/LanguageContext';
import { useTheme } from '../../DarkMode/ThemeContext';
import { translations } from '../../translations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const languages = [
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        icon: 'web'
    },
    {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        icon: 'web'
    },
    {
        code: 'ckb',
        name: 'Kurdish-Sorani',
        nativeName: 'کوردی-سۆرانی',
        icon: 'web'
    }
];

const LanguageScreen = () => {
    const { currentLanguage, changeLanguage } = useLanguage();
    const { theme } = useTheme();
    const navigation = useNavigation();
    const isLightTheme = theme === 'light';

    return (
        <View style={[styles.container, { backgroundColor: isLightTheme ? '#f5f5f5' : '#1A1A1A' }]}>
            <StatusBar
                backgroundColor={isLightTheme ? '#ffffff' : '#1a1a1a'}
                barStyle={isLightTheme ? 'dark-content' : 'light-content'}
            />
            
            {/* Header */}
            <View style={[styles.header, { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }]}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Profile')}
                        style={styles.backButton}
                    >
                        <Icon 
                            name="arrow-left" 
                            size={24} 
                            color={isLightTheme ? '#1a73e8' : '#64B5F6'} 
                        />
                    </TouchableOpacity>
                </View>
                <Icon name="translate" size={32} color={isLightTheme ? '#1a73e8' : '#64B5F6'} />
                <Text style={[styles.headerTitle, { color: isLightTheme ? '#000' : '#fff' }]}>
                    {translations[currentLanguage].profile.language}
                </Text>
                <Text style={[styles.headerSubtitle, { color: isLightTheme ? '#666' : '#aaa' }]}>
                    {translations[currentLanguage].profile.languageSubtitle}
                </Text>
            </View>

            {/* Language List */}
            <View style={styles.languageList}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.languageItem,
                            { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
                        ]}
                        onPress={() => changeLanguage(lang.code)}
                    >
                        <View style={styles.languageInfo}>
                            <Icon 
                                name={lang.icon} 
                                size={24} 
                                color={isLightTheme ? '#1a73e8' : '#64B5F6'} 
                                style={styles.languageIcon}
                            />
                            <View>
                                <Text style={[styles.languageName, { color: isLightTheme ? '#000' : '#fff' }]}>
                                    {lang.name}
                                </Text>
                                <Text style={[styles.nativeName, { color: isLightTheme ? '#666' : '#aaa' }]}>
                                    {lang.nativeName}
                                </Text>
                            </View>
                        </View>
                        {currentLanguage === lang.code && (
                            <Icon name="check" size={24} color={isLightTheme ? '#1a73e8' : '#64B5F6'} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 12,
    },
    headerSubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    languageList: {
        padding: 16,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    languageInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageIcon: {
        marginRight: 12,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '500',
    },
    nativeName: {
        fontSize: 14,
        marginTop: 2,
    },
    headerTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
    },
});

export default LanguageScreen;