import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { BookPage } from './pages/BookPage/BookPage';
import { BooksSection } from './pages/BooksSection/BooksSection';
import { HousesSection } from './pages/HousesSection/HousesSection';
import { HousePage } from './pages/HousePage/HousePage';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback';
import { ProtectedRoute } from './components/ProtectedRoute';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/books' element={<BooksSection />} />
        <Route path='/books/:name' element={
          <ErrorBoundary fallback={<ErrorFallback />}>
            <BookPage />
          </ErrorBoundary>
        } />
        <Route path='/houses/' element={<HousesSection />} />
        <Route path='/houses/:name' element={
          <ErrorBoundary fallback={<ErrorFallback />}>
            <HousePage />
          </ErrorBoundary>
        } />
        <Route element={<ProtectedRoute />}>
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/history' element={<HistoryPage/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

