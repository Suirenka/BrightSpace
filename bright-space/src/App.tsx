import { Routes, Route } from "react-router-dom";
import BSHome from "./pages/BSHome";
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
} from "@fluentui/react-components";
import { createContext, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BSResource from "./pages/BSResource";
import SpottingCyberbullying from "./pages/resourcePages/SpottingCyberbullying";
import WhatToDoIfTargeted from "./pages/resourcePages/WhatToDoIfTargeted";
import HelpFriends from "./pages/resourcePages/HelpFriends";
import GroupChats from "./pages/resourcePages/GroupChats";
import BSReport from "./pages/BSReport";
import BSPostingCoach from "./pages/BSPostingCoach";
import BSDailyChallenge from "./pages/BSDailyChallenge";
import BSDailyQuiz from "./pages/BSDailyQuiz";
import BSBoundary from "./pages/BSBoundary";
import BSData from "./pages/BSData";
import BSReflectiveTwin from "./pages/BSReflectiveTwin";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />

          <div style={{ flexGrow: 1, paddingTop: "5rem"}}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<BSHome />} />
              <Route path="bs-resource" element={<BSResource />} />
              <Route path="bs-posting-coach" element={<BSPostingCoach />} />
              <Route
                path="spotting-cyberbullying"
                element={<SpottingCyberbullying />}
              />
              <Route
                path="what-to-do-if-targeted"
                element={<WhatToDoIfTargeted />}
              />
              <Route path="help-friends" element={<HelpFriends />} />
              <Route path="group-chat-guidance" element={<GroupChats />} />
              <Route path="report" element={<BSReport />} />
              <Route path="bs-daily-challenge" element={<BSDailyChallenge />} />
              <Route path="bs-daily-quiz" element={<BSDailyQuiz />} />
              <Route path="/report" element={<BSReport />} />
              <Route path="bs-boundaries-builder" element={<BSBoundary />} />
              <Route path="/bs-data" element={<BSData />} />
              <Route path="bs-reflective-twin" element={<BSReflectiveTwin />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </FluentProvider>
    </ThemeContext.Provider>
  );
}

export default App;
