import './App.css';
import Header from './components/header/Header';
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={}></Route> */}
          
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
