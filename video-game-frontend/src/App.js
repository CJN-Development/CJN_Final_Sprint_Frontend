import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import GameList from "./components/GameList/GameList";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<GameList />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
