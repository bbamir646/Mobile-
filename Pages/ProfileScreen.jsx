import { View, Text, Switch, StyleSheet, ScrollView, Image, Pressable, Platform } from 'react-native';
import { useTheme } from '../DarkMode/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../DarkMode/LanguageContext';
import { translations } from '../translations';

export const ProfileScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const { currentLanguage } = useLanguage();
    const isLightTheme = theme === 'light';
    const navigation = useNavigation();

    const t = translations[currentLanguage].profile;

    const menuItems = [
        { icon: 'account-edit', title: t.editProfile, subtitle: t.editProfileSubtitle },
        { icon: 'bell-outline', title: t.notifications, subtitle: t.notificationsSubtitle },
        { icon: 'translate', title: t.language, subtitle: t.languageSubtitle },
        { icon: 'shield-lock-outline', title: t.privacy, subtitle: t.privacySubtitle },
        { icon: 'help-circle-outline', title: t.helpSupport, subtitle: t.helpSupportSubtitle },
        { icon: 'cog-outline', title: t.settings, subtitle: t.settingsSubtitle },
    ];

    const MenuItem = ({ icon, title, subtitle }) => (
        <Pressable
            style={[
                styles.menuItem,
                { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
            ]}
            android_ripple={{ color: isLightTheme ? '#eee' : '#333' }}
            onPress={() => {
                if (title === t.editProfile) {
                    navigation.navigate('EditProfile');
                } else if (title === t.language) {
                    navigation.navigate('Language');
                }
            }}
        >
            <Icon
                name={icon}
                size={24}
                color={isLightTheme ? '#1a73e8' : '#64B5F6'}
                style={styles.menuIcon}
            />
            <View style={styles.menuTextContainer}>
                <Text style={[
                    styles.menuTitle,
                    { color: isLightTheme ? '#000' : '#fff' }
                ]}>
                    {title}
                </Text>
                <Text style={[
                    styles.menuSubtitle,
                    { color: isLightTheme ? '#666' : '#aaa' }
                ]}>
                    {subtitle}
                </Text>
            </View>
            <Icon
                name="chevron-right"
                size={24}
                color={isLightTheme ? '#666' : '#aaa'}
            />
        </Pressable>
    );

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: isLightTheme ? '#f5f5f5' : '#1A1A1A' }
            ]}
        >
            {/* Profile Header */}
            <View style={[
                styles.header,
                { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
            ]}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={require('../assets/images/4.jpg')}
                        style={styles.profileImage}
                    />

                </View>
                <Text style={[
                    styles.name,
                    { color: isLightTheme ? '#000' : '#fff' }
                ]}>
                    John Doe
                </Text>
                <Text style={[
                    styles.email,
                    { color: isLightTheme ? '#666' : '#aaa' }
                ]}>
                    john.doe@example.com
                </Text>
            </View>

            {/* Theme Switch */}
            <View style={[
                styles.themeContainer,
                { backgroundColor: isLightTheme ? '#fff' : '#2A2A2A' }
            ]}>
                <View style={styles.themeRow}>
                    <Icon
                        name={isLightTheme ? 'weather-sunny' : 'weather-night'}
                        size={24}
                        color={isLightTheme ? '#1a73e8' : '#64B5F6'}
                    />
                    <Text style={[
                        styles.themeText,
                        { color: isLightTheme ? '#000' : '#fff' }
                    ]}>
                        {t.darkMode}
                    </Text>
                    <Switch
                        value={!isLightTheme}
                        onValueChange={toggleTheme}
                        thumbColor={isLightTheme ? '#fff' : '#64B5F6'}
                        trackColor={{
                            false: '#767577',
                            true: Platform.select({
                                ios: '#64B5F6',
                                android: '#1a73e8'
                            })
                        }}
                        ios_backgroundColor="#767577"
                    />
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </View>

            {/* Version Info */}
            <Text style={[
                styles.version,
                { color: isLightTheme ? '#666' : '#aaa' }
            ]}>
                {t.version} 1.0.0
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        marginBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    editImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#1a73e8',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
    },
    themeContainer: {
        marginBottom: 8,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    themeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    themeText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
    menuContainer: {
        marginBottom: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 1,
    },
    menuIcon: {
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    menuSubtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    version: {
        textAlign: 'center',
        padding: 16,
        fontSize: 12,
    },
});