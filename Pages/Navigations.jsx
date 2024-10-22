import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import {SearchScreen} from './SearchScreen';
import {DoctorsScreen} from './DoctorsScreen';
import {HealthRecordsScreen} from './HealthRecordsScreen';
import {ProfileScreen} from './ProfileScreen';

import {SafeAreaView} from "react-native";
import {useTheme} from "../DarkMode/ThemeContext";

const Tab = createBottomTabNavigator();

// Function to return icons based on the route name
const getTabBarIcon = (routeName, focused) => {
    let iconName;

    switch (routeName) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'Search':
            iconName = focused ? 'search' : 'search-outline';
            break;
        case 'Doctors':
            iconName = focused ? 'medkit' : 'medkit-outline';
            break;
        case 'Health Records':
            iconName = focused ? 'folder' : 'folder-outline';
            break;
        case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
        default:
            iconName = 'home';
    }

    return <Ionicons name={iconName} size={24} color={focused ? 'blue' : 'gray'} />;
};

const App = () => {
    const { theme } = useTheme(); // Access the current theme
    const isLightTheme = theme === 'light'; // Determine if the current theme is light

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false, // This hides the top header
                        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
                        tabBarActiveTintColor: isLightTheme ? 'blue' : 'lightblue', // Change based on theme
                        tabBarInactiveTintColor: isLightTheme ? 'gray' : 'darkgray', // Change based on theme

                        tabBarStyle: {
                            backgroundColor: isLightTheme ? '#f3f3f3' : '#333', // Change background based on theme
                            borderTopWidth: 0,
                            elevation: 5, // Add shadow on Android
                            shadowColor: '#000', // Shadow color for iOS
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            height: 70,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            paddingBottom: 7,
                            color: isLightTheme ? 'black' : 'white', // Change label color based on theme
                        },
                        tabBarItemStyle: {
                            padding: 5,
                        },
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Doctors" component={DoctorsScreen} />
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="Records" component={HealthRecordsScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;