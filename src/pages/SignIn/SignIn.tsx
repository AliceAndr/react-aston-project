import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../components/FormInput/FormInput";
import { signIn } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import './SignIn.css';

export const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(state => state.user);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let checkEmail = user[values.email as keyof typeof user]['email'];

      if (checkEmail && values.password === user[values.email as keyof typeof user]['password']) {
        dispatch(signIn(values.email));

        navigate("/");
      } else {
        alert("Invalid password.");
      }
    } catch (err) {
      alert("User doesn't exist.");
    }
  };

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <div className="app__signin">
      <div className="app__signin-form">
        <form onSubmit={handleSubmit}>
          <h1 className="app__signin-form-h1">Happy to see you back! Please, Sign In.</h1>
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
              onChange={onChange}
            />
          ))}
          <button className="app__form-button">Submit</button>
        </form>
      </div>
      <p className="app__signin-redirect">
        Still don't have an account?
        <Link to="/signup"><span className="app__signin-redirect-span"> Sign Up Now!</span></Link>
      </p>
    </div>
  )
}
