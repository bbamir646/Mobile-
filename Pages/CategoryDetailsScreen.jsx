import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from "../DarkMode/ThemeContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CategoryDetailsScreen = ({ route }) => {
    const { category } = route.params;
    const { theme } = useTheme();
    const isLightTheme = theme === 'light';
    const navigation = useNavigation();

    // Sample doctors data (you can replace this with your actual data)
    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: category.name,
            rating: 4.8,
            experience: '8 years',
            image: require('../assets/images/2.jpg'),
        },
        {
            id: 2,
            name: 'Dr. Michael Chen', 
            specialty: category.name,
            rating: 4.9,
            experience: '12 years',
            image: require('../assets/images/4.jpg'),
        },
        {
            id: 3,
            name: 'Dr. Emily Wilson',
            specialty: category.name, 
            rating: 4.7,
            experience: '10 years',
            image: require('../assets/images/3.jpg'),
        }
    ];

    return (
        <View style={[
            styles.container,
            { backgroundColor: isLightTheme ? '#f5f5f5' : '#1a1a1a' }
        ]}>
            {/* Header */}
            <View style={[
                styles.header,
                { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
            ]}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon 
                        name="arrow-left" 
                        size={24} 
                        color={isLightTheme ? '#333' : '#fff'} 
                    />
                </TouchableOpacity>
                <Text style={[
                    styles.headerTitle,
                    { color: isLightTheme ? '#333' : '#fff' }
                ]}>
                    {category.name} Specialists
                </Text>
            </View>

            {/* Doctors List */}
            <ScrollView style={styles.doctorsList}>
                {doctors.map((doctor) => (
                    <TouchableOpacity
                        key={doctor.id}
                        style={[
                            styles.doctorCard,
                            { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
                        ]}
                        onPress={() => {
                            // Navigate to doctor details screen
                            // navigation.navigate('DoctorDetails', { doctor });
                        }}
                    >
                        <Image 
                            source={doctor.image}
                            style={styles.doctorImage}
                        />
                        <View style={styles.doctorInfo}>
                            <Text style={[
                                styles.doctorName,
                                { color: isLightTheme ? '#333' : '#fff' }
                            ]}>
                                {doctor.name}
                            </Text>
                            <Text style={[
                                styles.doctorSpecialty,
                                { color: isLightTheme ? '#666' : '#aaa' }
                            ]}>
                                {doctor.specialty}
                            </Text>
                            <View style={styles.doctorStats}>
                                <View style={styles.statItem}>
                                    <Icon name="star" size={16} color="#FFD700" />
                                    <Text style={styles.statText}>{doctor.rating}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Icon name="briefcase-outline" size={16} color={isLightTheme ? '#666' : '#aaa'} />
                                    <Text style={styles.statText}>{doctor.experience}</Text>
                                </View>
                            </View>
                        </View>
                        <Icon 
                            name="chevron-right" 
                            size={24} 
                            color={isLightTheme ? '#666' : '#aaa'} 
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    backButton: {
        padding: 8,
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    doctorsList: {
        padding: 16,
    },
    doctorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    doctorImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        marginBottom: 8,
    },
    doctorStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    statText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#666',
    },
});

export default CategoryDetailsScreen; 