import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import GameList from "./components/GameList/GameList";
import Home from "./components/HomePage/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/Search" element={<GameList />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
