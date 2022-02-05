import { Routes, Route } from "react-router-dom";
import Home from "./View/Pages/HomePage/HomePage";
import Login from "./View/Pages/LoginPage/LoginPage";
import Register from "./View/Pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>        
        <Route path="/register" element={<Register/>}/>


      </Routes>
    </div>
  );
}

export default App;