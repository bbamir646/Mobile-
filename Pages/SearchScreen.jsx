import React from 'react';
import { View, Text } from 'react-native';
import {useTheme} from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';

export const SearchScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const { currentLanguage } = useLanguage();
    const isLightTheme = theme === 'light';
    const t = translations[currentLanguage].search;

    return (
        <View style={{flex: 1,backgroundColor: isLightTheme ? '#ffffff' : '#333' }}>
            <Text style={{color: isLightTheme ? '#333' : '#ffffff' }}>{t.welcome}</Text>
        </View>
    );
};
