import React from 'react';
import { View, Text } from 'react-native';
import {useTheme} from "../DarkMode/ThemeContext";

export const DoctorsScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const isLightTheme = theme === 'light';

    return (
        <View style={{flex: 1,backgroundColor: isLightTheme ? '#ffffff' : '#333' }}>
            <Text style={{color: isLightTheme ? '#333' : '#ffffff' }}>Welcome to DoctorFinder!</Text>
        </View>
    );
};


