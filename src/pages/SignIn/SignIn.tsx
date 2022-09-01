import React from "react"
import { Link } from "react-router-dom";
import './SignIn.css';
import Form from "../../components/Form/Form";

const SignIn:React.FC = () => {
  return (
    <div className="app__signin">
      <Form title="Sign In"/>
      <p className="app__signin-redirect">
        Still don't have an account?
        <Link to="/signin"><span className="app__signin-redirect-span"> Sign Up Now!</span></Link>
      </p>
    </div>
  )
}

export default SignIn;
