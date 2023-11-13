import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { logout } from "../../services/authService";
import { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext";
import * as jwt from 'jwt-decode';

export const Header = () => {
  const { user, setUser } = useContext(UserContext);

  function clearLogout() {
    setUser(null);
    logout();
  }
  return (
    <nav>
      {user && <span className={styles['hello-msg']}>Hello {jwt.jwtDecode(user).username}</span>}
      <Link to="/" className={styles["logo"]}>
        Home
      </Link>
      {user && (
        <>
          <Link onClick={clearLogout} to="/" className={styles["logout"]}>
            Logout
          </Link>
          <Link to="/protected" className={styles["protected"]}>
            Protected
          </Link>
        </>
      )}
      {!user && <>
        <Link to="/register" className={styles["register"]}>
          Register
        </Link>
        <Link to="/login" className={styles["login"]}>
          Login
        </Link>
      </>}
    </nav>
  );
};
