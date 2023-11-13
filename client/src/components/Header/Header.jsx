import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { isLoggedIn, logout } from "../../services/authService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
  const {user, setUser} = useContext(UserContext);

  function clearLogout(){
    setUser(null);
    logout();
  } 
  return (
    <nav>
      <Link to="/" className={styles["logo"]}>
        Home
      </Link>
      {user &&< Link onClick={clearLogout} to="/" className={styles["logout"]}>
        Logout
      </Link>}
      <Link to="/register" className={styles["register"]}>
        Register
      </Link>
      <Link to="/login" className={styles["login"]}>
        Login
      </Link>
      <Link to="/protected" className={styles["protected"]}>
        Protected
      </Link>
    </nav>
  );
};
