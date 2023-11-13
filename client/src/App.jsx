import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/AuthContext";
import { Protected } from "./components/Protected/Protected";

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
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/protected" element={user ? <Protected /> : <Navigate to="/login" />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
