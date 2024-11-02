import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Keyboard, Platform } from 'react-native';
import { useState, useEffect } from 'react';

import HomeScreen from './HomeScreen';
import {SearchScreen} from './SearchScreen';
import {DoctorsScreen} from './DoctorsScreen';
import {HealthRecordsScreen} from './ChatAi';
import {ProfileScreen} from './ProfileScreen';
import LanguageScreen from './LanguageScreen';

import {SafeAreaView, StatusBar} from "react-native";
import {useTheme} from "../DarkMode/ThemeContext";
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';

const Tab = createBottomTabNavigator();

// Function to return icons based on the route name
const getTabBarIcon = (routeName, focused) => {
    let iconName;
    let IconComponent = Ionicons;

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
        case 'Records':
            IconComponent = Icon;
            iconName = focused ? 'robot' : 'robot-outline';
            break;
        case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
        default:
            iconName = 'home';
    }

    return <IconComponent name={iconName} size={24} color={focused ? '#1a73e8' : 'gray'} />;
};

const App = () => {
    const { theme } = useTheme();
    const { currentLanguage } = useLanguage();
    const isLightTheme = theme === 'light';
    const t = translations[currentLanguage].navigation;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardWillHide = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={isLightTheme ? '#ffffff' : '#1a1a1a'} barStyle={isLightTheme ? 'dark-content' : 'light-content'}/>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
                        tabBarActiveTintColor: isLightTheme ? 'blue' : 'lightblue',
                        tabBarInactiveTintColor: isLightTheme ? 'gray' : 'darkgray',
                        tabBarStyle: {
                            backgroundColor: isLightTheme ? '#f3f3f3' : '#333',
                            borderTopWidth: 0,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            height: 70,
                            display: route.name === 'Language' || isKeyboardVisible ? 'none' : 'flex',
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            paddingBottom: 7,
                            color: isLightTheme ? 'black' : 'white',
                        },
                        tabBarItemStyle: {
                            padding: 5,
                        },
                    })}
                >
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen}
                        options={{ tabBarLabel: t.home }}
                    />
                    <Tab.Screen 
                        name="Doctors" 
                        component={DoctorsScreen}
                        options={{ tabBarLabel: t.doctors }}
                    />
                    <Tab.Screen 
                        name="Search" 
                        component={SearchScreen}
                        options={{ tabBarLabel: t.search }}
                    />
                    <Tab.Screen 
                        name="Records" 
                        component={HealthRecordsScreen}
                        options={{ 
                            tabBarLabel: t.records,
                            tabBarIcon: ({ focused }) => getTabBarIcon('Records', focused)
                        }}
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={ProfileScreen}
                        options={{ tabBarLabel: t.profile }}
                    />
                    <Tab.Screen 
                        name="Language" 
                        component={LanguageScreen}
                        options={{ 
                            headerShown: false,
                            tabBarButton: () => null,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;