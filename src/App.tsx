import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
// import Login from './containers/Login/Login';
// import Signup from './containers/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/signin' element={<Login />}/> */}
        {/* <Route path='/signup' element={<Signup />}/> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

