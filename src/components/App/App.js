import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
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
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('cards')) {
      moviesApi.getCardList()
      .then((initialCards) => {
        sessionStorage.setItem('cards', JSON.stringify(initialCards));
      })
      .catch(err => console.log(err));
    }

    if(localStorage.getItem('token')) {
      mainApi.checkToken()
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  function handleSignOut () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  return (
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
          <>
            <Header loggedIn={loggedIn} color={"black"} />
            <ContainerWrapper className={"container-wrapper__color_black"}>
              <SearchForm />
            </ContainerWrapper>
            <ContainerWrapper className={"container-wrapper__color_black container-wrapper__type_grow"}>
              <Preloader isActive={false} />
              <MoviesCardList isMoreButton={true} />
            </ContainerWrapper>
            <Footer />
          </>
        }
      />

      <Route
        path="/saved-movies"
        element={
          <>
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
          </>
        }
      />

      <Route
        path="/signup"
        element={
          <Register onRegister={handleRegister} />
        }
      />

      <Route
        path="/signin"
        element={
          <Login onLogin={handleLogin} />
        }
      />

      <Route
        path="/profile"
        element={
          <>
            <Header loggedIn={loggedIn} color={"black"} />
            <Profile onSignOut={handleSignOut} />
          </>
        }
      />

      <Route
        path="*"
        element={
          <Page404 />
        }
      />
    </Routes>
  );
}

export default App;
