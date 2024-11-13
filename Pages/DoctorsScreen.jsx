import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform ,StatusBar} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export const DoctorsScreen = () => {
    const { theme } = useTheme();
    const { currentLanguage } = useLanguage();
    const isLightTheme = theme === 'light';
    const t = translations[currentLanguage].doctors;
    const navigation = useNavigation();
    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    
    const [doctors] = useState([
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            coordinate: {
                latitude: 36.196819,
                longitude:  44.001656
            },
            rating: 4.8,
            isAvailable: true,
            experience: '8 years',
            image: require('../assets/images/2.jpg'),
            address: '123 Medical Center St.',
            nextAvailable: '2:30 PM Today'
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'Pediatrician',
            coordinate: {
                latitude: 36.1950,
                longitude: 43.9940
            },
            rating: 4.9,
            isAvailable: false,
            experience: '12 years',
            image: require('../assets/images/4.jpg'),
            address: '456 Healthcare Ave.',
            nextAvailable: 'Tomorrow 10:00 AM'
        },
    ]);

    useEffect(() => {
        (async () => {
            try {
                // First check if location services are enabled
                const providerStatus = await Location.hasServicesEnabledAsync();
                
                if (!providerStatus) {
                    setErrorMsg(t.locationServicesDisabled);
                    return;
                }

                // Then request permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg(t.locationPermissionDenied);
                    return;
                }

                // Get location with timeout and error handling
                const location = await Promise.race([
                    Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    }),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Timeout')), 10000)
                    )
                ]);

                setLocation(location);
            } catch (error) {
                console.log('Location error:', error);
                setErrorMsg(t.locationError);
            }
        })();
    }, [t]);

    const mapStyle = isLightTheme ? [] : [
        {
            "elementType": "geometry",
            "stylers": [{ "color": "#242f3e" }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#746855" }]
        },
        // Add more dark mode styling as needed
    ];

    const renderMarker = (doctor) => (
        <Marker
            key={doctor.id}
            identifier={`doctor-${doctor.id}`}
            coordinate={doctor.coordinate}
            title={doctor.name}
            description={doctor.specialty}
            onPress={() => setSelectedDoctor(doctor)}
        >
            <View style={styles.markerContainer} pointerEvents="none">
                <View style={[
                    styles.markerBubble,
                    { backgroundColor: isLightTheme ? '#fff' : '#333' }
                ]}>
                    <Image
                        source={doctor.image}
                        style={styles.markerImage}
                        resizeMode="cover"
                    />
                    <View style={[
                        styles.availabilityDot,
                        { backgroundColor: doctor.isAvailable ? '#4CAF50' : '#FF5252' }
                    ]} />
                </View>
            </View>
        </Marker>
    );

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor={isLightTheme ? '#ffffff' : '#1a1a1a'} barStyle={isLightTheme ? 'dark-content' : 'light-content'}/>
          
            {location ? (
                <>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                    >
                        {doctors.map((doctor) => renderMarker(doctor))}
                    </MapView>
                    
                    {selectedDoctor && (
                        <View style={[
                            styles.doctorCard,
                            { backgroundColor: isLightTheme ? '#fff' : '#333' }
                        ]}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={() => setSelectedDoctor(null)}
                            >
                                <Icon name="close" size={24} color={isLightTheme ? '#333' : '#fff'} />
                            </TouchableOpacity>
                            
                            <View style={styles.doctorInfo}>
                                <Image 
                                    source={selectedDoctor.image} 
                                    style={styles.doctorCardImage}
                                />
                                <View style={styles.doctorDetails}>
                                    <Text style={[
                                        styles.doctorName,
                                        { color: isLightTheme ? '#333' : '#fff' }
                                    ]}>
                                        {selectedDoctor.name}
                                    </Text>
                                    <Text style={[
                                        styles.doctorSpecialty,
                                        { color: isLightTheme ? '#666' : '#aaa' }
                                    ]}>
                                        {selectedDoctor.specialty}
                                    </Text>
                                    <View style={styles.ratingContainer}>
                                        <Icon name="star" size={16} color="#FFD700" />
                                        <Text style={styles.rating}>{selectedDoctor.rating}</Text>
                                        <Text style={styles.experience}>• {selectedDoctor.experience}</Text>
                                    </View>
                                    <Text style={[
                                        styles.availability,
                                        { color: selectedDoctor.isAvailable ? '#4CAF50' : '#FF5252' }
                                    ]}>
                                        {selectedDoctor.isAvailable ? 'Available Now' : selectedDoctor.nextAvailable}
                                    </Text>
                                </View>
                            </View>
                            
                            <TouchableOpacity 
                                style={[
                                    styles.bookButton,
                                    { opacity: selectedDoctor.isAvailable ? 1 : 0.7 }
                                ]}
                                onPress={() => {
                                    // Navigate to booking screen
                                    // navigation.navigate('BookAppointment', { doctor: selectedDoctor });
                                }}
                                disabled={!selectedDoctor.isAvailable}
                            >
                                <Text style={styles.bookButtonText}>
                                    {selectedDoctor.isAvailable ? 'Book Appointment' : 'View Schedule'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            ) : (
                <View style={[
                    styles.loadingContainer,
                    { backgroundColor: isLightTheme ? '#fff' : '#333' }
                ]}>
                    <Text style={[
                        styles.loadingText,
                        { color: isLightTheme ? '#333' : '#fff' }
                    ]}>
                        {errorMsg || t.loadingMap}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    markerContainer: {
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    markerBubble: {
        padding: 4,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#1a73e8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    availabilityDot: {
        position: 'absolute',
        right: -2,
        top: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
    },
    doctorCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
    },
    doctorInfo: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    doctorCardImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    doctorDetails: {
        flex: 1,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    rating: {
        marginLeft: 4,
        marginRight: 8,
        color: '#666',
    },
    experience: {
        color: '#666',
    },
    availability: {
        fontSize: 14,
        fontWeight: '500',
    },
    bookButton: {
        backgroundColor: '#1a73e8',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});


