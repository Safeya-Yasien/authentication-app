import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApiSlice";
import styles from "@styles/form.module.css";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isSingup }: { isSingup: boolean }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const [register, { isError: isRegisterError, error: registerError }] =
    useRegisterMutation();
  const [login, { isError: isLoginError, error: loginError }] =
    useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let data;

      if (isSingup) {
        const response = await register({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        });
        data = response.data;
      } else {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        data = response.data;
      }

      const accessToken = data?.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken);

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Failed to authenticate", err);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          {isSingup && (
            <>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                placeholder="Your first name"
                required
                minLength={3}
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                placeholder="Your Last name"
                required
                minLength={3}
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleInputChange}
          />
        </fieldset>
        <button type="submit">{isSingup ? "Signin" : "Signin"}</button>
      </form>

      {isRegisterError && registerError && (
        <p className={styles.error}>
          {(registerError as { data: { message: string } }).data.message}
        </p>
      )}
      {isLoginError && loginError && (
        <p className={styles.error}>
          {(loginError as { data: { message: string } }).data.message}
        </p>
      )}
    </>
  );
};

export default AuthForm;
