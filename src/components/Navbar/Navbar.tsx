import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch, useCurrentUser } from '../../hooks/hooks';
import { logOut } from '../../redux/slices/userSlice';
import { ThemeContext } from '../../ThemeProvider';
import mainLogo from '../../assets/Site-logo.webp';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './Navbar.css';


export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const { isAuth, username, email } = useCurrentUser() || {}

  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logOut(email));
  };

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to='/'><img src={mainLogo} alt="logo" /></Link>
      </div>

      {isAuth &&
        <ul className='app__navbar-links'>
          <Link to='/favorites'><li className='app__navbar-item'>Favorites</li></Link>
          <li className='app__navbar-item'><a href='#history'>History</a></li>
        </ul>
      }

      {
        theme === 'light' ?
          <div onClick={toggleTheme} className="mode-wrap">
            <DarkModeIcon className='mode-icon' />
          </div>
          :
          <div onClick={toggleTheme} className="mode-wrap">
            <LightModeIcon className='mode-icon' />
          </div>
      }

      {isAuth ? (
        <div className='app__navbar-login'>
          <div className='p__opensans'>{username}</div>
          <div className='app__navbar-login-separator'></div>
          <div onClick={logout} className='p__opensans'>Log Out</div>
        </div>
      ) : (
        <div className='app__navbar-login'>
          <Link to='/signin'><div className='p__opensans'>Sign In</div></Link>
          <div className='app__navbar-login-separator'></div>
          <Link to='/signup'><div className='p__opensans'>Sign Up</div></Link>
        </div>
      )}
    </nav>
  );
};
