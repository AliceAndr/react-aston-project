import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../components/FormInput/FormInput";
import { addUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../hooks/hooks";
import './SignUp.css';

export const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      isAuth: false,
      favorites: [],
      historySearch: [],
    };

    dispatch(addUser(newUser));
    navigate('/signin');
  };

  const onChange = (value: string, name: string) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="app__signup">
      <div className="app__signup-form">
        <form onSubmit={handleSubmit}>
          <h1 className="app__signup-form-h1">Want to join the club? Register Now!</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              id={input.id}
              name={input.name}
              type={input.type}
              errorMessage={input.errorMessage}
              label={input.label}
              pattern={input.pattern}
              required={input.required}
              placeholder={input.placeholder}
              value={values[input.name as keyof typeof values]}
              onChange={(e) => onChange(e.target.value, e.target.name)}
            />
          ))}
          <button className="app__form-button">Submit</button>
        </form>
      </div>
      <p className="app__signup-redirect">
        Already have an accout?
        <Link to="/signin"><span className="app__signup-redirect-span"> Sign In Now!</span></Link>
      </p>
    </div>
  )
}
