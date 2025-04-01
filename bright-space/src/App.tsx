import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InfoTab from "./pages/InfoTab";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Header />
      <div style={{ padding: "1rem", paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="infotab" element={<InfoTab />} />
        </Routes>
      </div>
      <Footer />
    </FluentProvider>
  );
}

export default App;
