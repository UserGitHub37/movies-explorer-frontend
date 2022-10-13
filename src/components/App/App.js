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
  const checkboxStorageMainMovies = 'isShortMainMovies';
  const checkboxStorageSavedMovies = 'isShortSavedMovies';
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [mainMovies, setMainMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloaderIsActive, setPreloaderIsActive] = useState(false);

  const navigate = useNavigate();
  let { pathname } = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch(err => {
          setLoggedIn(false);
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const filteredInitialMovies = JSON.parse(localStorage.getItem('filteredInitialMovies'));
      const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));

      if (checkArrayfulness(filteredInitialMovies)) {
        filterByCheckbox(checkboxStorageMainMovies, filteredInitialMovies, setMainMovies);
      } else {
        setMainMovies([]);
      }

      if (checkArrayfulness(savedMoviesFromStorage)) {
        setSavedMovies(savedMoviesFromStorage);
      } else {
        setPreloaderIsActive(true);
        mainApi.getSavedMoviesList()
          .then((data) => {
            localStorage.setItem('savedMovies', JSON.stringify(data));
            setSavedMovies(data);
          })
          .catch(err => console.log(err))
          .finally(() => setPreloaderIsActive(false));
      }

    }
  }, [loggedIn]);

  function checkArrayfulness (array) {
    return Array.isArray(array) && array.length > 0;
  }

  function filterByCheckbox (checkboxStorageName, initialArray, saveResultFunction) {
    if (localStorage.getItem(checkboxStorageName) === 'true') {
      saveResultFunction(() => initialArray.filter((card) => card.duration < 40));
    } else {
      saveResultFunction(initialArray);
    }
  }

  function handleLogin(data) {
    mainApi.authorize(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        mainApi.getUserInfo()
          .then((userData) => {
            setCurrentUser(userData);
            setLoggedIn(true);
            navigate('/movies');
          })
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
      .catch(err => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('mainMoviesSearchText');
    localStorage.removeItem('savedMoviesSearchText');
    localStorage.removeItem('isShortMainMovies');
    localStorage.removeItem('isShortSavedMovies');
    localStorage.removeItem('filteredInitialMovies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    navigate('/');
  }

  function handleSearchMovies(searchText) {
    setMainMovies([]);
    const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));

    if (pathname === '/movies') {
      localStorage.setItem('mainMoviesSearchText', searchText);
      if (!searchText) {
        localStorage.removeItem('filteredInitialMovies');
      } else if (!initialMovies) {
        setPreloaderIsActive(true);
        moviesApi.getMoviesList()
          .then((data) => {
            localStorage.setItem('initialMovies', JSON.stringify(data));
            const filteredInitialMovies = data.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
            filterByCheckbox(checkboxStorageMainMovies, filteredInitialMovies, setMainMovies);
            localStorage.setItem('filteredInitialMovies', JSON.stringify(filteredInitialMovies));
          })
          .catch(err => console.log(err))
          .finally(() => setPreloaderIsActive(false));
      } else {
        const filteredInitialMovies = initialMovies.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
        filterByCheckbox(checkboxStorageMainMovies, filteredInitialMovies, setMainMovies);
        localStorage.setItem('filteredInitialMovies', JSON.stringify(filteredInitialMovies));
      }
    }

    if (pathname === '/saved-movies') {
      if (searchText) {
        const filteredSavedMovies = savedMovies.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
        setSavedMovies(filteredSavedMovies);
      }
    }
  }

  function handleSetShortMovies(checked) {
    if (pathname === '/movies') {
      localStorage.setItem('isShortMainMovies', checked);
      const filteredInitialMovies = JSON.parse(localStorage.getItem('filteredInitialMovies'));
      if (checkArrayfulness(filteredInitialMovies)) {
        filterByCheckbox(checkboxStorageMainMovies, filteredInitialMovies, setMainMovies);
      }
    }

    if (pathname === '/saved-movies') {
      localStorage.setItem('isShortSavedMovies', checked);
      const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));
      if (checkArrayfulness(savedMoviesFromStorage)) {
        filterByCheckbox(checkboxStorageSavedMovies, savedMoviesFromStorage, setSavedMovies);
      }
    }
  }

  function handleLikeCard(card) {
    const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));
    const isSaved = savedMoviesFromStorage.some(savedMovie => savedMovie.movieId === card.movieId);

    if (isSaved) {
      handleRemoveCard(card.movieId);
    } else {
      mainApi.saveMovie(card)
      .then((card) => {
        const updatedSavedMovies = savedMoviesFromStorage.concat(card);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);
      })
      .catch(err => console.log(err));
    }
  }

  function handleRemoveCard (cardId) {
    const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));
    mainApi.removeSavedMovie(cardId)
      .then(() => {
        const updatedSavedMovies = savedMoviesFromStorage.filter((savedMovie) => savedMovie.movieId !== cardId);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);
      })
      .catch(err => console.log(err));
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
                <SearchForm onSearchMovies={handleSearchMovies} onSetShortMovies={handleSetShortMovies} pathname={pathname} />
              </ContainerWrapper>
              <ContainerWrapper
                className={
                  "container-wrapper__color_black container-wrapper__type_grow"
                }
              >
                <Preloader isActive={preloaderIsActive} />
                <MoviesCardList cards={mainMovies} savedMovies={savedMovies} onLikeCard={handleLikeCard} pathname={pathname} nameIdCard={'id'} />
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
                <SearchForm onSearchMovies={handleSearchMovies} onSetShortMovies={handleSetShortMovies} pathname={pathname} />
              </ContainerWrapper>
              <ContainerWrapper
                className={
                  "container-wrapper__color_black container-wrapper__type_grow"
                }
              >
                <Preloader isActive={preloaderIsActive} />
                <MoviesCardList cards={savedMovies} savedMovies={savedMovies} onLikeCard={handleLikeCard} pathname={pathname} onRemoveCard={handleRemoveCard} nameIdCard={'movieId'} />
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
