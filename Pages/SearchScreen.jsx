import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    StatusBar,
    Platform,
    Pressable
} from 'react-native';
import { useTheme } from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

export const SearchScreen = () => {
    const { theme } = useTheme();
    const { currentLanguage } = useLanguage();
    const isLightTheme = theme === 'light';
    const t = translations[currentLanguage].search;
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    
    const filters = ['All', 'Available', 'Top Rated', 'Nearest'];
    
    const categories = [
        {
            id: 1,
            name: 'Cardiology',
            doctors: [
                {
                    id: 1,
                    name: 'Dr. Sarah Johnson',
                    specialty: 'Cardiologist',
                    rating: 4.8,
                    isAvailable: true,
                    experience: '8 years',
                    image: require('../assets/images/2.jpg'),
                    nextAvailable: '2:30 PM Today'
                },
                {
                    id: 2,
                    name: 'Dr. Michael Chen',
                    specialty: 'Cardiologist',
                    rating: 4.9,
                    isAvailable: false,
                    experience: '12 years',
                    image: require('../assets/images/4.jpg'),
                    nextAvailable: 'Tomorrow 10:00 AM'
                },
                {
                    id: 11,
                    name: 'Dr. Sarah Johnson',
                    specialty: 'Cardiologist',
                    rating: 4.8,
                    isAvailable: true,
                    experience: '8 years',
                    image: require('../assets/images/2.jpg'),
                    nextAvailable: '2:30 PM Today'
                },
                {
                    id: 22,
                    name: 'Dr. Michael Chen',
                    specialty: 'Cardiologist',
                    rating: 4.9,
                    isAvailable: false,
                    experience: '12 years',
                    image: require('../assets/images/4.jpg'),
                    nextAvailable: 'Tomorrow 10:00 AM'
                },
            ]
        },
        {
            id: 2,
            name: 'Neurology',
            doctors: [
                {
                    id: 3,
                    name: 'Dr. Emily Rodriguez',
                    specialty: 'Neurologist',
                    rating: 4.7,
                    isAvailable: true,
                    experience: '10 years',
                    image: require('../assets/images/2.jpg'),
                    nextAvailable: '3:45 PM Today'
                },
                {
                    id: 4,
                    name: 'Dr. James Wilson',
                    specialty: 'Neurologist',
                    rating: 4.9,
                    isAvailable: true,
                    experience: '15 years',
                    image: require('../assets/images/4.jpg'),
                    nextAvailable: '1:15 PM Today'
                },
                {
                    id: 33,
                    name: 'Dr. Sarah Johnson',
                    specialty: 'Cardiologist',
                    rating: 4.8,
                    isAvailable: true,
                    experience: '8 years',
                    image: require('../assets/images/2.jpg'),
                    nextAvailable: '2:30 PM Today'
                },
                {
                    id: 44,
                    name: 'Dr. Michael Chen',
                    specialty: 'Cardiologist',
                    rating: 4.9,
                    isAvailable: false,
                    experience: '12 years',
                    image: require('../assets/images/4.jpg'),
                    nextAvailable: 'Tomorrow 10:00 AM'
                },
            ]
        },
        {
            id: 3,
            name: 'Neurology',
            doctors: [
                {
                    id: 4,
                    name: 'Dr. Emily Rodriguez',
                    specialty: 'Neurologist',
                    rating: 4.7,
                    isAvailable: true,
                    experience: '10 years',
                    image: require('../assets/images/2.jpg'),
                    nextAvailable: '3:45 PM Today'
                },
                {
                    id: 5,
                    name: 'Dr. James Wilson',
                    specialty: 'Neurologist',
                    rating: 4.9,
                    isAvailable: true,
                    experience: '15 years',
                    image: require('../assets/images/4.jpg'),
                    nextAvailable: '1:15 PM Today'
                },
            ]
        },
        // Add more categories as needed
    ];

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.45;
    const cardHeight = cardWidth * 1.4;

    const renderDoctorCard = (doctor) => (
        <Pressable 
            android_ripple={{ color: isLightTheme ? '#eee' : '#333' }}
            key={doctor.id}
            style={[
                styles.doctorCard,
                { 
                    backgroundColor: isLightTheme ? '#fff' : '#2A2A2A',
                    width: cardWidth,
                    height: cardHeight,
                }
            ]}
            onPress={() => {
                // Navigate to doctor details
                // navigation.navigate('DoctorDetails', { doctor });
            }}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={doctor.image}
                    style={styles.doctorImage}
                />
                <View style={[
                    styles.availabilityBadge,
                    { backgroundColor: doctor.isAvailable ? '#4CAF50' : '#FF5252' }
                ]}>
                    <Text style={styles.availabilityText}>
                        {doctor.isAvailable ? 'Available' : 'Busy'}
                    </Text>
                </View>
            </View>
            <View style={styles.doctorContent}>
                <View style={styles.doctorInfo}>
                    <Text style={[
                        styles.doctorName,
                        { color: isLightTheme ? '#333' : '#fff' }
                    ]} numberOfLines={1}>
                        {doctor.name}
                    </Text>
                    <Text style={[
                        styles.doctorSpecialty,
                        { color: isLightTheme ? '#666' : '#aaa' }
                    ]} numberOfLines={1}>
                        {doctor.specialty}
                    </Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={16} color="#FFD700" />
                            <Text style={[
                                styles.rating,
                                { color: isLightTheme ? '#666' : '#aaa' }
                            ]}>
                                {doctor.rating}
                            </Text>
                        </View>
                        <View style={styles.experienceContainer}>
                            <Icon name="briefcase-outline" size={16} color={isLightTheme ? '#666' : '#aaa'} />
                            <Text style={[
                                styles.experience,
                                { color: isLightTheme ? '#666' : '#aaa' }
                            ]}>
                                {doctor.experience}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    const renderFilterModal = () => (
        <Modal
            isVisible={isFilterModalVisible}
            onBackdropPress={() => setFilterModalVisible(false)}
            style={styles.modal}
        >
            <View style={[
                styles.modalContent,
                { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
            ]}>
                <View style={styles.modalHeader}>
                    <Text style={[
                        styles.modalTitle,
                        { color: isLightTheme ? '#333' : '#fff' }
                    ]}>
                        {t.filters.title}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => setFilterModalVisible(false)}
                        style={styles.closeModalButton}
                    >
                        <Icon name="close" size={24} color={isLightTheme ? '#333' : '#fff'} />
                    </TouchableOpacity>
                </View>
                
                {/* Add your filter options here */}
                <View style={styles.filterOptions}>
                    {/* Example filter options */}
                    <Text style={[
                        styles.filterOptionTitle,
                        { color: isLightTheme ? '#333' : '#fff' }
                    ]}>
                        Specialty
                    </Text>
                    {/* Add more filter options */}
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={[
            styles.container,
            { backgroundColor: isLightTheme ? '#f5f5f5' : '#1a1a1a' }
        ]}>
            <StatusBar 
                backgroundColor={isLightTheme ? '#ffffff' : '#1a1a1a'} 
                barStyle={isLightTheme ? 'dark-content' : 'light-content'}
            />
            
            {/* Search Header */}
            <View style={[
                styles.searchHeader,
                { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
            ]}>
                <View style={[
                    styles.searchInputContainer,
                    { 
                        backgroundColor: isLightTheme ? '#f5f5f5' : '#333',
                        borderColor: isLightTheme ? '#e0e0e0' : '#404040'
                    }
                ]}>
                    <Icon 
                        name="magnify" 
                        size={24} 
                        color={isLightTheme ? '#666' : '#aaa'} 
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={[
                            styles.searchInput,
                            { color: isLightTheme ? '#333' : '#fff' }
                        ]}
                        placeholder={t.searchPlaceholder}
                        placeholderTextColor={isLightTheme ? '#666' : '#aaa'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity 
                        onPress={() => setFilterModalVisible(true)}
                        style={styles.filterButton}
                    >
                        <Icon 
                            name="filter-variant" 
                            size={24} 
                            color={isLightTheme ? '#666' : '#aaa'} 
                        />
                    </TouchableOpacity>
                    {searchQuery !== '' && (
                        <TouchableOpacity 
                            onPress={() => setSearchQuery('')}
                            style={styles.clearButton}
                        >
                            <Icon 
                                name="close-circle" 
                                size={20} 
                                color={isLightTheme ? '#666' : '#aaa'} 
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Filters */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.filtersContainer}
                >
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterChip,
                                { 
                                    backgroundColor: selectedFilter === filter 
                                        ? (isLightTheme ? '#1a73e8' : '#64B5F6')
                                        : (isLightTheme ? '#fff' : '#333')
                                }
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                { 
                                    color: selectedFilter === filter 
                                        ? '#fff'
                                        : (isLightTheme ? '#666' : '#aaa')
                                }
                            ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Categories and Doctors */}
            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {categories.map((category) => (
                    <View key={category.id} style={styles.categorySection}>
                        <Text style={[
                            styles.categoryTitle,
                            { color: isLightTheme ? '#333' : '#fff' }
                        ]}>
                            {category.name}
                        </Text>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.doctorsRow}
                            contentContainerStyle={styles.doctorsRowContent}
                        >
                            {category.doctors.map(renderDoctorCard)}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>

            {renderFilterModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchHeader: {
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    clearButton: {
        padding: 4,
    },
    filtersContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginVertical: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 4,
    },
    categorySection: {
        marginBottom: 24,
       

    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        marginHorizontal: 12,
        marginTop: 17,
    },
    doctorsRow: {
        flexDirection: 'row',
    },
    doctorsRowContent: {
        paddingRight: 16,
    },
    doctorCard: {
        marginRight: 16,
        borderRadius: 16,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '60%',
    },
    doctorImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    availabilityBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    availabilityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    doctorContent: {
        flex: 1,
        padding: 12,
        
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 13,
        marginBottom: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 4,
        fontSize: 13,
        fontWeight: '500',
    },
    experienceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    experience: {
        marginLeft: 4,
        fontSize: 13,
        fontWeight: '500',
    },
    filterButton: {
        padding: 8,
        marginRight: 4,
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    closeModalButton: {
        padding: 4,
    },
    filterOptions: {
        paddingBottom: 20,
    },
    filterOptionTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
    },
});
