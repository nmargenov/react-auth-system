import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Protected } from "./components/Protected/Protected";
import { MustBeAuthGuard } from "./guards/MustBeAuthGuard";
import { MustBeGuestGuard } from "./guards/MustBeGuestGuard";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <MustBeGuestGuard>
              <Login />
            </MustBeGuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <MustBeGuestGuard>
              <Register />
            </MustBeGuestGuard>
          }
        />
        <Route
          path="/protected"
          element={
            <MustBeAuthGuard>
              <Protected />
            </MustBeAuthGuard>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
