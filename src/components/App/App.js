import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
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
  const [mainCards, setMainCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [preloaderIsActive, setPreloaderIsActive] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
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

  useEffect(() => {
    if (location.pathname === '/movies') {
      const filteredAllMovies = localStorage.getItem('filteredAllMovies');
      if (filteredAllMovies) {
        if (localStorage.getItem('isShortMovies') === 'true') {
          setMainCards(() => JSON.parse(filteredAllMovies).filter((card) => card.duration < 40));
        } else {
          setMainCards(() => JSON.parse(filteredAllMovies));
        }
      } else {
        setMainCards([]);
      }
    }

    if (location.pathname === '/saved-movies') {
      const filteredSavedMovies = localStorage.getItem('filteredSavedMovies');
      if (filteredSavedMovies) {
        if (localStorage.getItem('isShortSavedMovies') === 'true') {
          setSavedCards(() => JSON.parse(filteredSavedMovies).filter((card) => card.duration < 40));
        } else {
          setSavedCards(() => JSON.parse(filteredSavedMovies));
        }
      } else {
        setSavedCards([]);
      }
    }
  }, [location.pathname]);

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

  function handleSearchMovies(searchText) {
    if (location.pathname === '/movies') {
      setMainCards([]);
      localStorage.setItem('moviesSearchText', searchText);
      if (!searchText) {
        localStorage.removeItem('filteredAllMovies');
      } else if (!localStorage.getItem('allMovies')) {
        setPreloaderIsActive(true);
        moviesApi.getMoviesList()
          .then((data) => {
            localStorage.setItem('allMovies', JSON.stringify(data));
            const filteredData = data.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
            setMainCards(filteredData);
            localStorage.setItem('filteredAllMovies', JSON.stringify(filteredData));
          })
          .catch(err => console.log(err))
          .finally(() => setPreloaderIsActive(false));
      } else {
        const allMoviesFromStorage = JSON.parse(localStorage.getItem('allMovies'));
        const filteredData = allMoviesFromStorage.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
        setMainCards(filteredData);
        localStorage.setItem('filteredAllMovies', JSON.stringify(filteredData));
      }

    } else if (location.pathname === '/saved-movies') {
      setSavedCards([]);
      localStorage.setItem('savedMoviesSearchText', searchText);
      if (!localStorage.getItem('savedMovies')) {
        mainApi.getSavedMoviesList()
          .then((data) => {
            localStorage.setItem('savedMovies', JSON.stringify(data));
            setSavedCards(data);
          })
          .catch(err => console.log(err));
      } else {
        setSavedCards(JSON.parse(localStorage.getItem('savedMovies')));
      }
    }
  }

  function handleSetShortMovies(checked) {
    if (location.pathname === '/movies') {
      localStorage.setItem('isShortMovies', checked);
      const filteredAllMovies = localStorage.getItem('filteredAllMovies');
      if (filteredAllMovies) {
        if (checked) {
          setMainCards(() => JSON.parse(filteredAllMovies).filter((card) => card.duration < 40));
        } else {
          setMainCards(() => JSON.parse(filteredAllMovies));
        }
      } else {
        setMainCards([])
      }
    } else if (location.pathname === '/saved-movies') {
      localStorage.setItem('isShortSavedMovies', checked);
      const filteredSavedMovies = localStorage.getItem('filteredSavedMovies');
      if (filteredSavedMovies) {
        if (checked) {
          setSavedCards(() => JSON.parse(filteredSavedMovies).filter((card) => card.duration < 40));
        } else {
          setSavedCards(() => JSON.parse(filteredSavedMovies));
        }
      } else {
        setSavedCards([]);
      }
    }
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
                <SearchForm onSearchMovies={handleSearchMovies} onSetShortMovies={handleSetShortMovies} />
              </ContainerWrapper>
              <ContainerWrapper
                className={
                  "container-wrapper__color_black container-wrapper__type_grow"
                }
              >
                <Preloader isActive={preloaderIsActive} />
                <MoviesCardList cards={mainCards} />
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
                <SearchForm onSearchMovies={handleSearchMovies} onSetShortMovies={handleSetShortMovies} />
              </ContainerWrapper>
              <ContainerWrapper
                className={
                  "container-wrapper__color_black container-wrapper__type_grow"
                }
              >
                <Preloader isActive={preloaderIsActive} />
                <MoviesCardList cards={savedCards} />
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
