import styles from "./login.module.css";

export const Login = () => {
  return (
    <div className={styles["main"]}>
      <form>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id={styles["username"]} name="username" required />
        
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id={styles["password"]}
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
