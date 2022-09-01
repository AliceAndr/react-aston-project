import React from 'react';
import { Link } from "react-router-dom";
import mainLogo from '../../assets/Site-logo.webp';
import './Navbar.css';


const Navbar:React.FC = () => {
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to='/'><img src={mainLogo} alt="logo" /></Link>
      </div>

      {/* {isLoggedIn && 
            <ul className='app__navbar-links'>
            <li className='app__navbar-item'><a href='#favorites'>Favorites</a></li>
            <li className='app__navbar-item'><a href='#history'>History</a></li>
          </ul>
      }

      {isLoggedIn ?
        <div className='app__navbar-login'>
          <div className='p__opensans'>{userName}</div>
          <div className='app__navbar-login-separator'></div>
          <div onClick={logout} className='p__opensans'>Log Out</div>
        </div> :

        <div className='app__navbar-login'>
          <Link to='/signin'><div className='p__opensans'>Sign In</div></Link>
          <div className='app__navbar-login-separator'></div>
          <Link to='/signup'><div className='p__opensans'>Sign Up</div></Link>
        </div>
      } */}

      <ul className='app__navbar-links'>
        <li className='app__navbar-item'><a href='#favorites'>Favorites</a></li>
        <li className='app__navbar-item'><a href='#history'>History</a></li>
      </ul>

      <div className='app__navbar-login'>
        <Link to='/signin'><div className='p__opensans'>Sign In</div></Link>
        <div className='app__navbar-login-separator'></div>
        <Link to='/signup'><div className='p__opensans'>Sign Up</div></Link>
      </div>
  </nav>
  );
};

export default Navbar;
