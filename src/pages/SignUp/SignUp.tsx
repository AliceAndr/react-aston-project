import React from "react"
import { Link } from "react-router-dom";
import './SignUp.css';
import Form from "../../components/Form/Form";

const SignUp:React.FC = () => {
  return (
    <div className="app__signup">
      <Form title="Want to join the club? Register Now!"/>
      <p className="app__signup-redirect">
        Already have an account?  
        <Link to="/signin"><span className="app__signup-redirect-span"> Sign In Now!</span></Link>
      </p>
    </div>
  )
}

export default SignUp;
