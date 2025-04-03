import { Routes, Route } from "react-router-dom";
import BSHome from "./pages/BSHome";
import BSContact from "./pages/footerPages/BSContact";
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
} from "@fluentui/react-components";
import { createContext, useContext, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BSResource from "./pages/BSResource";
import BSTermsAndConditions from "./pages/footerPages/BSTermsAndConditions";
import BSPrivacy from "./pages/footerPages/BSPrivacy";

interface IThemeContext {
  theme: typeof teamsLightTheme | typeof teamsDarkTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: teamsLightTheme,
  toggleTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState(teamsLightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === teamsLightTheme ? teamsDarkTheme : teamsLightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <FluentProvider theme={theme}>
        <Header />

        <Routes>
          <Route path="/" element={<BSHome />} />
          <Route path="bs-resource" element={<BSResource />} />
          <Route path="contact" element={<BSContact />} />
          <Route
            path="terms-and-condition"
            element={<BSTermsAndConditions />}
          />
          <Route path="privacy" element={<BSPrivacy />} />
        </Routes>

        <Footer />
      </FluentProvider>
    </ThemeContext.Provider>
  );
}

export default App;
