import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform ,StatusBar} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export const Maps = () => {
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
                latitude: 36.094306 + (Math.random() - 0.5) * 0.01,
                longitude: 44.649964 + (Math.random() - 0.5) * 0.01
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
                latitude: 36.095706 + (Math.random() - 0.5) * 0.01,
                longitude: 44.653541 + (Math.random() - 0.5) * 0.01
            },
            rating: 4.9,
            isAvailable: false,
            experience: '12 years',
            image: require('../assets/images/4.jpg'),
            address: '456 Healthcare Ave.',
            nextAvailable: 'Tomorrow 10:00 AM'
        },
        {
            id: 3,
            name: 'Dr. Emily Rodriguez',
            specialty: 'Dermatologist',
            coordinate: {
                latitude: 36.093506 + (Math.random() - 0.5) * 0.01,
                longitude: 44.651964 + (Math.random() - 0.5) * 0.01
            },
            rating: 4.7,
            isAvailable: true,
            experience: '10 years',
            image: require('../assets/images/2.jpg'),
            address: '789 Skin Care Center',
            nextAvailable: '3:45 PM Today'
        },
        {
            id: 4,
            name: 'Dr. James Wilson',
            specialty: 'Orthopedist',
            coordinate: {
                latitude: 36.096106 + (Math.random() - 0.5) * 0.01,
                longitude: 44.650541 + (Math.random() - 0.5) * 0.01
            },
            rating: 4.9,
            isAvailable: true,
            experience: '15 years',
            image: require('../assets/images/4.jpg'),
            address: '321 Bone & Joint Clinic',
            nextAvailable: '1:15 PM Today'
        }
    ]);

    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg(t.locationPermissionDenied);
                    return;
                }

                // Get location with better error handling
                const locationResult = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                    timeout: 15000,
                }).catch(error => {
                    console.log('Location error:', error);
                    throw new Error(t.locationError);
                });

                console.log('Location received:', locationResult);
                setLocation(locationResult);

                // Log the calculated region
                const region = getInitialRegion(locationResult);
                console.log('Initial region:', region);

                // Animate to user location if map ref exists
                if (mapRef.current && locationResult) {
                    mapRef.current.animateToRegion(region, 1000);
                }
            } catch (error) {
                console.log('Location error:', error);
                setErrorMsg(t.locationError);
            }
        })();
    }, [t]);

    const mapStyle = isLightTheme ? [] : [
        {
            "elementType": "geometry",
            "stylers": [{"color": "#242f3e"}]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#242f3e"}]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{"color": "#263c3f"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#6b9a76"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#38414e"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#212a37"}]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"color": "#746855"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#1f2835"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{"color": "#2f3948"}]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#17263c"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#17263c"}]
        }
    ];

    const getInitialRegion = (userLocation) => {
        if (!userLocation) return null;
        
        // Calculate the center of all points (user location + doctors)
        let minLat = userLocation.coords.latitude;
        let maxLat = userLocation.coords.latitude;
        let minLng = userLocation.coords.longitude;
        let maxLng = userLocation.coords.longitude;
        
        doctors.forEach(doctor => {
            minLat = Math.min(minLat, doctor.coordinate.latitude);
            maxLat = Math.max(maxLat, doctor.coordinate.latitude);
            minLng = Math.min(minLng, doctor.coordinate.longitude);
            maxLng = Math.max(maxLng, doctor.coordinate.longitude);
        });
        
        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;
        
        // Add some padding to the deltas
        const latDelta = (maxLat - minLat) * 1.5 || 0.0922;
        const lngDelta = (maxLng - minLng) * 1.5 || 0.0421;
        
        return {
            latitude: centerLat,
            longitude: centerLng,
            latitudeDelta: Math.max(latDelta, 0.0922),
            longitudeDelta: Math.max(lngDelta, 0.0421),
        };
    };

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor={isLightTheme ? '#ffffff' : '#1a1a1a'} barStyle={isLightTheme ? 'dark-content' : 'light-content'}/>
          
            {location && doctors.length > 0 ? (
                <>
                    <MapView
                        ref={mapRef}
                        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        initialRegion={{
                            latitude: 36.094306,
                            longitude: 44.649964,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        region={getInitialRegion(location)}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        showsCompass={true}
                        loadingEnabled={true}
                        loadingIndicatorColor="#1a73e8"
                        loadingBackgroundColor={isLightTheme ? "#ffffff" : "#333333"}
                        onMapReady={() => {
                            console.log('Map is ready');
                        }}
                        onRegionChangeComplete={(region) => {
                            console.log('Region changed:', region);
                        }}
                    >
                        {doctors.map((doctor) => {
                            console.log('Rendering doctor marker:', doctor);
                            return (
                                <Marker
                                    key={doctor.id}
                                    identifier={`doctor-${doctor.id}`}
                                    coordinate={doctor.coordinate}
                                    title={doctor.name}
                                    description={doctor.specialty}
                                    onPress={() => {
                                        console.log('Marker pressed:', doctor);
                                        setSelectedDoctor(doctor);
                                    }}
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
                        })}
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
                    <View style={[
                        styles.loadingCard,
                        { backgroundColor: isLightTheme ? '#ffffff' : '#424242' }
                    ]}>
                        <View style={styles.loadingIconContainer}>
                            <Icon 
                                name={errorMsg ? "map-marker-alert" : "map-marker-radius"} 
                                size={50} 
                                color={errorMsg ? "#FF5252" : "#1a73e8"}
                            />
                        </View>
                        <Text style={[
                            styles.loadingText,
                            { color: isLightTheme ? '#333' : '#fff' }
                        ]}>
                            {errorMsg || (doctors.length === 0 ? 'No doctors found' : t.loadingMap)}
                        </Text>
                        {errorMsg && (
                            <TouchableOpacity 
                                style={styles.enableLocationButton}
                                onPress={async () => {
                                    let { status } = await Location.requestForegroundPermissionsAsync();
                                    if (status === 'granted') {
                                        setErrorMsg(null);
                                        const locationResult = await Location.getCurrentPositionAsync({});
                                        setLocation(locationResult);
                                    }
                                }}
                            >
                                <Icon name="location-enter" size={20} color="#fff" style={styles.buttonIcon} />
                                <Text style={styles.enableLocationText}>Enable Location</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    markerContainer: {
        alignItems: 'center',
        width: 36,
        height: 36,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
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
        padding: 20,
    },
    loadingCard: {
        width: '100%',
        maxWidth: 340,
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    loadingIconContainer: {
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    enableLocationButton: {
        backgroundColor: '#1a73e8',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 200,
    },
    buttonIcon: {
        marginRight: 8,
    },
    enableLocationText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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