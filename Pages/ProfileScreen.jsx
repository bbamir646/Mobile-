import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../DarkMode/ThemeContext'; // Adjust the import path as needed

export const ProfileScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const isLightTheme = theme === 'light';

    return (
        <View style={[styles.container, { backgroundColor: isLightTheme ? '#ffffff' : '#333' }]}>
            <Text style={{ color: isLightTheme ? '#000' : '#fff', fontSize: 20 }}>
                Current Theme: {isLightTheme ? 'Light' : 'Dark'}
            </Text>
            <Switch
                value={isLightTheme}
                onValueChange={toggleTheme}
                thumbColor={isLightTheme ? '#fff' : '#000'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});


