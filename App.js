import s from './App.Style';
import { ThemeProvider } from './DarkMode/ThemeContext'; // Import your ThemeProvider
import Navigations from './Pages/Navigations';

const App = () => {
  return (
      <ThemeProvider>
        <Navigations/>
      </ThemeProvider>
  );
};

export default App;
