import { useForm } from "../../hooks/useForm";
import { login, setCookie } from "../../services/authService";
import { useNavigate } from "react-router";
import styles from "./login.module.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const { values, onInputChange } = useForm(initialValues);

  const {setUser} = useContext(UserContext);


  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    login(values)
      .then((data) => {
        setCookie(data);
        setUser(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
