import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Details from './pages/Details';
import Favourites from './pages/Favourites';
import History from './pages/History';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Fragment>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/details/:bookId' element={<Details />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/history' element={<History />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
