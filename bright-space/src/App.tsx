import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InfoTab from "./pages/InfoTab";
import BSContact from "./pages/BSContact";
import BSTermsAndConditions from "./pages/BSTermsAndConditions";
import BSPrivacy from "./pages/BSPrivacy";
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
} from "@fluentui/react-components";
import { createContext, useContext, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <div style={{ padding: "1rem", paddingBottom: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="infotab" element={<InfoTab />} />
            <Route path="contact" element={<BSContact />} />
            <Route
              path="terms-and-condition"
              element={<BSTermsAndConditions />}
            />
            <Route path="privacy" element={<BSPrivacy />} />
          </Routes>
        </div>
        <Footer />
      </FluentProvider>
    </ThemeContext.Provider>
  );
}

export default App;
