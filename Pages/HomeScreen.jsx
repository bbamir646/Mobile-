import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
    const { theme } = useTheme();
    const { currentLanguage } = useLanguage();
    const isLightTheme = theme === 'light';
    const navigation = useNavigation();

    const categories = [
        {
            id: 1,
            name: 'Cardiology',
            icon: 'heart-pulse',
            color: '#FF6B6B',
            description: 'Heart & Blood Vessel Specialists'
        },
        {
            id: 2,
            name: 'Neurology',
            icon: 'brain',
            color: '#4ECDC4',
            description: 'Brain & Nervous System'
        },
        {
            id: 3,
            name: 'Pediatrics',
            icon: 'baby-face-outline',
            color: '#45B7D1',
            description: 'Child Healthcare'
        },
        {
            id: 4,
            name: 'Orthopedics',
            icon: 'bone',
            color: '#96CEB4',
            description: 'Bone & Joint Specialists'
        },
        {
            id: 5,
            name: 'Dentistry',
            icon: 'tooth-outline',
            color: '#D4A5A5',
            description: 'Dental Care'
        },
        {
            id: 6,
            name: 'Ophthalmology',
            icon: 'eye-outline',
            color: '#9B89B3',
            description: 'Eye Care Specialists'
        }
    ];

    const handleCategoryPress = (category) => {
        navigation.navigate('CategoryDetails', { category });
    };

    return (
        <ScrollView 
            style={[
                styles.container,
                { backgroundColor: isLightTheme ? '#f5f5f5' : '#1a1a1a' }
            ]}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <View>
                    <Text style={[
                        styles.welcomeText,
                        { color: isLightTheme ? '#333' : '#fff' }
                    ]}>
                        Find Your
                    </Text>
                    <Text style={[
                        styles.doctorText,
                        { color: isLightTheme ? '#1a73e8' : '#64B5F6' }
                    ]}>
                        Specialist Doctor
                    </Text>
                </View>
            </View>

            {/* Categories Grid */}
            <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryCard,
                            { backgroundColor: isLightTheme ? '#ffffff' : '#2A2A2A' }
                        ]}
                        onPress={() => handleCategoryPress(category)}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                            <Icon name={category.icon} size={30} color="#fff" />
                        </View>
                        <Text style={[
                            styles.categoryName,
                            { color: isLightTheme ? '#333' : '#fff' }
                        ]}>
                            {category.name}
                        </Text>
                        <Text style={[
                            styles.categoryDescription,
                            { color: isLightTheme ? '#666' : '#aaa' }
                        ]}>
                            {category.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 40,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
    },
    doctorText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 5,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: Dimensions.get('window').width / 2 - 20,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    categoryDescription: {
        fontSize: 12,
        opacity: 0.7,
    },
});

export default HomeScreen;