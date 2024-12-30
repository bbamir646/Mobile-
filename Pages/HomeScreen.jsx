import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
import { useTheme } from '../DarkMode/ThemeContext'
import { useLanguage } from '../DarkMode/LanguageContext'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window')

const categories = [
  { id: 1, name: 'Cardiology', icon: 'heart-pulse' },
  { id: 2, name: 'Neurology', icon: 'brain' },
  { id: 3, name: 'Pediatrics', icon: 'baby-face-outline' },
  { id: 4, name: 'Orthopedics', icon: 'bone' },
  { id: 5, name: 'Dentistry', icon: 'tooth-outline' },
  { id: 6, name: 'Ophthalmology', icon: 'eye-outline' },
]

const topDoctors = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', rating: 4.9, image: require('../assets/images/2.jpg') },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Neurologist', rating: 4.8, image: require('../assets/images/22.jpg') },
  { id: 3, name: 'Dr. Mike Johnson', specialty: 'Pediatrician', rating: 4.7, image: require('../assets/images/33.jpg') },
]

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Sarah Lee', specialty: 'Dentist', date: '2023-06-15', time: '10:00 AM' },
  { id: 2, doctor: 'Dr. Tom Wilson', specialty: 'Ophthalmologist', date: '2023-06-18', time: '2:30 PM' },
]

export default function Component() {
  const { theme } = useTheme()
  const { currentLanguage } = useLanguage()
  const isLightTheme = theme === 'light'
  const navigation = useNavigation()

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryDetails', { category })
  }

  const handleDoctorPress = (doctor) => {
    navigation.navigate('DoctorDetails', { doctor })
  }

  const handleAppointmentPress = (appointment) => {
    navigation.navigate('AppointmentDetails', { appointment })
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: isLightTheme ? '#ffffff' : '#2A2A2A' }]}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: isLightTheme ? '#E8F0FE' : '#3A3A3A' }]}>
        <Icon name={item.icon} size={24} color={isLightTheme ? '#1a73e8' : '#64B5F6'} />
      </View>
      <Text style={[styles.categoryName, { color: isLightTheme ? '#333' : '#fff' }]}>{item.name}</Text>
    </TouchableOpacity>
  )

  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.doctorCard, { backgroundColor: isLightTheme ? '#ffffff' : '#2A2A2A' }]}
      onPress={() => handleDoctorPress(item)}
    >
      <Image source={item.image} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={[styles.doctorName, { color: isLightTheme ? '#333' : '#fff' }]}>{item.name}</Text>
        <Text style={[styles.doctorSpecialty, { color: isLightTheme ? '#666' : '#aaa' }]}>{item.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={[styles.ratingText, { color: isLightTheme ? '#333' : '#fff' }]}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f5f5' : '#1a1a1a' }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: isLightTheme ? '#333' : '#fff' }]}>Hello,</Text>
          <Text style={[styles.nameText, { color: isLightTheme ? '#1a73e8' : '#64B5F6' }]}>John Doe</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bell-outline" size={24} color={isLightTheme ? '#333' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="account-circle" size={32} color={isLightTheme ? '#1a73e8' : '#64B5F6'} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: isLightTheme ? '#333' : '#fff' }]}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      <View style={styles.appointmentsHeader}>
        <Text style={[styles.sectionTitle, { color: isLightTheme ? '#333' : '#fff' }]}>Upcoming Appointments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllAppointments')}>
          <Text style={[styles.viewAllText, { color: isLightTheme ? '#1a73e8' : '#64B5F6' }]}>View all</Text>
        </TouchableOpacity>
      </View>
      {upcomingAppointments.map((appointment) => (
        <TouchableOpacity
          key={appointment.id}
          style={[styles.appointmentCard, { backgroundColor: isLightTheme ? '#ffffff' : '#2A2A2A' }]}
          onPress={() => handleAppointmentPress(appointment)}
        >
          <Icon name="calendar-clock" size={24} color={isLightTheme ? '#1a73e8' : '#64B5F6'} style={styles.appointmentIcon} />
          <View style={styles.appointmentInfo}>
            <Text style={[styles.appointmentDoctor, { color: isLightTheme ? '#333' : '#fff' }]}>{appointment.doctor}</Text>
            <Text style={[styles.appointmentSpecialty, { color: isLightTheme ? '#666' : '#aaa' }]}>{appointment.specialty}</Text>
            <Text style={[styles.appointmentDateTime, { color: isLightTheme ? '#666' : '#aaa' }]}>
              {appointment.date} at {appointment.time}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={isLightTheme ? '#1a73e8' : '#64B5F6'} />
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionTitle, { color: isLightTheme ? '#333' : '#fff' }]}>Top Doctors</Text>
      <FlatList
        data={topDoctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.doctorsContainer}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileButton: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    width: width * 0.25,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
    padding: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontWeight: '600',
    textAlign: 'center',
  },
  appointmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  appointmentIcon: {
    marginRight: 15,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentDoctor: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  appointmentSpecialty: {
    fontSize: 14,
    marginBottom: 3,
  },
  appointmentDateTime: {
    fontSize: 12,
  },
  doctorsContainer: {
    paddingHorizontal: 10,
  },
  doctorCard: {
    width: width * 0.7,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 14,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
  },
})