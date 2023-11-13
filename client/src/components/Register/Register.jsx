import { useForm } from "../../hooks/useForm";
import { register, setCookie } from "../../services/authService";
import { useNavigate } from "react-router";
import styles from "../Login/login.module.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext";

export const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    rePassword: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
  };

  const { values, onInputChange } = useForm(initialValues);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    register(values)
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
      <form className={styles["form-register"]} onSubmit={onSubmit}>
        <h2>Register</h2>
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
        <label htmlFor="username">Repeat password:</label>

        <input
          value={values.rePassword}
          onChange={onInputChange}
          type="password"
          id={styles["password"]}
          name="rePassword"
          required
        />
        <label htmlFor="username">Email:</label>

        <input
          value={values.email}
          onChange={onInputChange}
          type="email"
          id={styles["username"]}
          name="email"
          required
        />
        <label htmlFor="username">First Name:</label>

        <input
          value={values.firstName}
          onChange={onInputChange}
          type="text"
          id={styles["username"]}
          name="firstName"
          required
        />
        <label htmlFor="username">Last Name:</label>

        <input
          value={values.lastName}
          onChange={onInputChange}
          type="text"
          id={styles["username"]}
          name="lastName"
          required
        />
        <label htmlFor="username">Age:</label>

        <input
          value={values.age}
          onChange={onInputChange}
          type="number"
          id={styles["username"]}
          name="age"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
