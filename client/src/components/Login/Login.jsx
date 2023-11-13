import { useForm } from "../../hooks/useForm";
import styles from "./login.module.css";

export const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const { values, onInputChange } = useForm(initialValues);

  function onSubmit(e){
    e.preventDefault();
    console.log(values);
  }

  return (
    <div className={styles["main"]}>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
        onChange={onInputChange}
          type="text"
          id={styles["username"]}
          name="username"
          value={values.username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          value={values.password}
          onChange={onInputChange}
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
