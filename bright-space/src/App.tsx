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
import BSSafetyGuide from "./pages/BSSafetyGuide";
import SpottingCyberbullying from "./pages/resourcePages/SpottingCyberbullying";
import WhatToDoIfTargeted from "./pages/resourcePages/WhatToDoIfTargeted";
import HelpFriends from "./pages/resourcePages/HelpFriends";
import GroupChats from "./pages/resourcePages/GroupChats";
import BSPostingCoach from "./pages/BSPostingCoach";

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
          <Route path="bs-posting-coach" element={<BSPostingCoach />} />
          <Route path="contact" element={<BSContact />} />
          <Route
            path="terms-and-condition"
            element={<BSTermsAndConditions />}
          />
          <Route path="privacy" element={<BSPrivacy />} />
          <Route path="bs-staysafe" element={<BSSafetyGuide />} />
          <Route
            path="spotting-cyberbullying"
            element={<SpottingCyberbullying />}
          />
          <Route
            path="what-to-do-if-targeted"
            element={<WhatToDoIfTargeted />}
          />
          <Route path="/help-friends" element={<HelpFriends />} />
          <Route path="group-chat-guidance" element={<GroupChats />} />
        </Routes>

        <Footer />
      </FluentProvider>
    </ThemeContext.Provider>
  );
}

export default App;
