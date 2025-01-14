import { createStackNavigator } from '@react-navigation/stack';
import LanguageScreen from '../Components/ProfileScreenComponents/LanguageScreen';
import CategoryDetailsScreen from '../Components/HomeScreenComponent/CategoryDetailsScreen';

const Stack = createStackNavigator();

export const SecondaryNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="Language" 
                component={LanguageScreen}
                options={{ unmountOnBlur: true }}
            />
            <Stack.Screen 
                name="CategoryDetails" 
                component={CategoryDetailsScreen}
                options={{ unmountOnBlur: true }}
            />
        </Stack.Navigator>
    );
};

export default SecondaryNavigation; 