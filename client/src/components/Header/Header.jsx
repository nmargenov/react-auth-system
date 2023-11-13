import { Link } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
    return (
        <nav>
            <Link to='/home' className={styles["logo"]}>Home</Link>
            <Link to="/protected" className={styles["protected"]}>Protected</Link>
            <Link to="/login" className={styles["login"]}>Login</Link>
            <Link to="/register" className={styles["register"]}>Register</Link>
            <Link to="/logout" className={styles["logout"]}>Logout</Link>
        </nav>
    );
}