import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { BookPage } from './pages/BookPage/BookPage';
import { BooksSection } from './pages/BooksSection/BooksSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/books' element={<BooksSection />} />
        <Route path='/books/:name' element={<BookPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

