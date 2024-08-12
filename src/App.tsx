import NavBar from "./components/nav/navbar";
import { Box } from "@mui/material";
import "./App.css";
import TopMenu from "./components/menuheader/topMenu";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <Box>
      <NavBar />
      <TopMenu />
      <Footer />
    </Box>
  );
};

export default App;
