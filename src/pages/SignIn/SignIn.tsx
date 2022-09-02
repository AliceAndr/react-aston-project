import React, { useState } from "react"
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import './SignIn.css';

const SignIn:React.FC = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

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

export default SignIn;
