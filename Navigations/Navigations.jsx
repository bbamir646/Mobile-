import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Keyboard, Platform, Animated, Pressable, View, Text } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import HomeScreen from '../Pages/HomeScreen';
import {SearchScreen} from '../Pages/SearchScreen';
import {Maps} from '../Pages/Maps';
import {HealthRecordsScreen} from '../Pages/ChatAi';
import {ProfileScreen} from '../Pages/ProfileScreen';
import LanguageScreen from '../Components/ProfileScreenComponents/LanguageScreen';
import CategoryDetailsScreen from '../Components/HomeScreenComponent/CategoryDetailsScreen';

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
            iconName = focused ? 'map' : 'map-outline';
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

const CustomTabBar = ({ state, descriptors, navigation, isLightTheme }) => {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: isLightTheme ? '#f3f3f3' : '#333',
      height: 70,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }}>
      {state.routes.map((route, index) => {
        if (route.name === 'Language' || route.name === 'CategoryDetails') return null;
        
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;
        const isSearch = route.name === 'Search';

        const animatedValue = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.spring(animatedValue, {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
            friction: 8,
            tension: 40
          }).start();
        }, [isFocused]);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isSearch) {
          return (
            <Pressable
              key={index}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: '#1a73e8',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -30,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -8]
                      })
                    },
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2]
                      })
                    }
                  ]
                }}
              >
                <Ionicons 
                  name={isFocused ? 'search' : 'search-outline'} 
                  size={30} 
                  color="white" 
                />
              </Animated.View>
              <Animated.Text
                style={{
                  color: isLightTheme ? 'black' : 'white',
                  fontSize: 12,
                  marginTop: 10,
                  opacity: animatedValue,
                  transform: [{
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [8, 0]
                    })
                  }]
                }}
              >
                {label}
              </Animated.Text>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8]
                    })
                  },
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2]
                    })
                  }
                ]
              }}
            >
              {getTabBarIcon(route.name, isFocused)}
            </Animated.View>
            <Animated.Text
              style={{
                color: isLightTheme ? 'black' : 'white',
                fontSize: 12,
                marginTop: 5,
                opacity: animatedValue,
                transform: [{
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0]
                  })
                }]
              }}
            >
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
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
                    tabBar={props => !isKeyboardVisible && <CustomTabBar {...props} isLightTheme={isLightTheme} />}
                    screenOptions={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarStyle: { display: isKeyboardVisible ? 'none' : 'flex' }
                    }}
                    initialRouteName="Home"
                >
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen}
                        options={{ tabBarLabel: t.home }}
                    />
                    <Tab.Screen 
                        name="Doctors" 
                        component={Maps}
                        options={{ tabBarLabel: t.doctors }}
                    />
                    <Tab.Screen 
                        name="Search" 
                        component={SearchScreen}
                        options={{ 
                            tabBarLabel: t.search,
                            unmountOnBlur: true
                        }}
                    />
                    <Tab.Screen 
                        name="Records" 
                        component={HealthRecordsScreen}
                        options={{ 
                            tabBarLabel: t.records,
                            tabBarIcon: ({ focused }) => getTabBarIcon('Records', focused),
                            unmountOnBlur: true
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
                            unmountOnBlur: true
                        }}
                    />
                    <Tab.Screen 
                        name="CategoryDetails" 
                        component={CategoryDetailsScreen}
                        options={{ 
                            tabBarButton: () => null,
                            headerShown: false,
                            unmountOnBlur: true
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App; 