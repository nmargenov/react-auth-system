import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/AuthContext";

function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    if(token){
      setUser(token);
    }
  },[]);
  return (
    <UserContext.Provider value={{user,setUser}}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
