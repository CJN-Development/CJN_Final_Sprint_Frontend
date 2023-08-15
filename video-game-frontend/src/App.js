import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import GameList from "./components/GameList/GameList";
import Home from "./components/HomePage/Home";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/Search" element={<GameList />}></Route>
          <Route path="/" element={<Home />}></Route>
          

        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
