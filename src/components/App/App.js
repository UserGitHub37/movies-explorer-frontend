import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';
import ProtectedRoute from '../common/ProtectedRoute/ProtectedRoute';
import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import MainPageNav from '../Header/MainPageNav/MainPageNav';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from '../common/Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Page404 from '../Page404/Page404';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('cards')) {
      moviesApi.getCardList()
        .then((initialCards) => {
          sessionStorage.setItem('cards', JSON.stringify(initialCards));
        })
        .catch(err => console.log(err));
    }

    if (localStorage.getItem('token')) {
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }

  }, []);

  function handleLogin(data) {
    mainApi.authorize(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('token', res.token);
        navigate('/movies');
      })
      .catch(err => console.log(err));
  }

  function handleRegister(data) {
    mainApi.register(data)
      .then(() => {
        handleLogin({
          email: data.email,
          password: data.password,
        })
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={loggedIn} color={"dark-blue"} />
              <Promo />
              <MainPageNav />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
              <Footer />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} color={"black"} />
              <ContainerWrapper className={"container-wrapper__color_black"}>
                <SearchForm />
              </ContainerWrapper>
              <ContainerWrapper
                className={
                  "container-wrapper__color_black container-wrapper__type_grow"
                }
              >
                <Preloader isActive={false} />
                <MoviesCardList isMoreButton={true} />
              </ContainerWrapper>
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} color={"black"} />
              <ContainerWrapper className={"container-wrapper__color_black"}>
                <SearchForm />
              </ContainerWrapper>
              <ContainerWrapper
                className={
                  "container-wrapper__color_black container-wrapper__type_grow"
                }
              >
                <Preloader isActive={false} />
                <MoviesCardList />
              </ContainerWrapper>
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Register onRegister={handleRegister} />
            )
          }
        />

        <Route
          path="/signin"
          element={
            loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} color={"black"} />
              <Profile onSignOut={handleSignOut} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
