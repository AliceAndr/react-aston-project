import { Link } from 'react-router-dom';
import './ErrorFallback.css';

export const ErrorFallback = () => {
  return (
    <section className='app_error-boundary'>
      <p className='app_error-boundary-p'>Ooops! Looks like something went wrong!</p>
      <Link to='/'>
        <button className='app_error-boundary-button'>Go to Main Page</button>
      </Link>
    </section>
  );
};
