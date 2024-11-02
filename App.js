import { ThemeProvider } from './DarkMode/ThemeContext';
import { LanguageProvider } from './DarkMode/LanguageContext';
import Navigations from './Pages/Navigations';

const App = () => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <Navigations/>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;
