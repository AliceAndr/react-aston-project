import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { BookPage } from './pages/BookPage/BookPage';
import { BooksSection } from './pages/BooksSection/BooksSection';
import { HousesSection } from './pages/HousesSection/HousesSection';
import { HousePage } from './pages/HousePage/HousePage';

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
        <Route path='/houses/' element={<HousesSection />} />
        <Route path='/houses/:name' element={<HousePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

