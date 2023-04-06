import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

const theme = createTheme({
  palette: {
    primary: {
      main: "#66347F",
      light: "#8364D0",
      dark: "#37306B",
    },
    secondary: {
      main: "#D27685"
    }
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
