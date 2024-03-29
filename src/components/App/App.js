import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';
import ProtectedRoute from '../common/ProtectedRoute/ProtectedRoute';
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
import Message from '../common/Message/Message';
import InfoTooltip from '../common/Popup/InfoTooltip/InfoTooltip';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import {
  filterMovies,
  checkArrayfulness,
} from '../../utils/utils';

const {
  SEARCH_ERRORS,
  STATUS_CODE,
} = require('../../utils/constants');

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [mainMovies, setMainMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [mainDisplayedCards, setMainDisplayedCards] = useState([]);
  const [savedDisplayedCards, setSavedDisplayedCards] = useState([]);
  const [preloaderIsActive, setPreloaderIsActive] = useState(false);
  const [searchErrorIsActive, setSearchErrorIsActive] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [serverMessage, setServerMessage] = useState({
    text: '',
    isError: null,
  });
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => {
          if (err.status === STATUS_CODE.UNAUTHORIZED) {
            handleSignOut();
          }
          console.log(err);
        });
    } else {
      handleSignOut();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const mainMoviesFromStorage = JSON.parse(localStorage.getItem('mainMovies'));
      const filteredMainMoviesFromStorage = JSON.parse(localStorage.getItem('filteredMainMovies'));
      const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));

      if (checkArrayfulness(mainMoviesFromStorage)) {
        setMainMovies(mainMoviesFromStorage);
      }

      if (checkArrayfulness(filteredMainMoviesFromStorage)) {
        setMainDisplayedCards(filteredMainMoviesFromStorage);
      }

      if (checkArrayfulness(savedMoviesFromStorage)) {
        setSavedMovies(savedMoviesFromStorage);
        setSavedDisplayedCards(savedMoviesFromStorage);
      } else {
        mainApi.getSavedMoviesList()
          .then((data) => {
            setSavedMovies(data);
            setSavedDisplayedCards(data);
            localStorage.setItem("savedMovies", JSON.stringify(data));
          })
          .catch((err) => {
            if (err.status === STATUS_CODE.UNAUTHORIZED) {
              handleSignOut();
            }
            console.log(err);
          });
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    if (pathname === '/saved-movies') {
      setSavedDisplayedCards(() => JSON.parse(localStorage.getItem('savedMovies')));
    }
  }, [pathname])

  useEffect(() => {
  if (pathname === '/profile' || pathname === '/sigin' || pathname === '/signup') {
    setServerMessage({
        text: '',
        isError: null,
      });
    } else if (pathname === '/movies' || pathname === '/saved-movies') {
      setSearchErrorIsActive(false);
      setSearchErrorMessage(false);
    }
  }, [pathname])

  useEffect(() => {
    if (!searchErrorIsActive) return;

    setTimeout(() => {
      setSearchErrorIsActive(false);
      setSearchErrorMessage(false);
    }, 5000);
  }, [searchErrorIsActive])

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
      .catch(async (err) => {
        const res = await err.json();
        setServerMessage({
          text: res.message,
          isError: true,
        });
        setIsInfoTooltipPopupOpen(true);
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
      .catch(async (err) => {
        const res = await err.json();
        setServerMessage({
          text: res.message,
          isError: true,
        });
        setIsInfoTooltipPopupOpen(true);
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    mainApi.updateUserInfo(data)
    .then((userData) => {
      setServerMessage({
        text: 'Ваши данные успешно изменены',
        isError: false,
      });
      setCurrentUser(userData);
      setIsInfoTooltipPopupOpen(true);
    })
    .catch(async (err) => {
      const res = await err.json();
      setServerMessage({
        text: res.message,
        isError: true,
      });
      setIsInfoTooltipPopupOpen(true);

      if (err.status === STATUS_CODE.UNAUTHORIZED) {
        setTimeout(() => {
          handleSignOut();
        }, 3000);
      }
      console.log(err);
    })
    .catch(err => console.log(err));
  }

  function closeInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(false);
    setServerMessage({
      text: '',
      isError: null,
    })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
    setCurrentUser({});
    setMainMovies([]);
    setSavedMovies([]);
    setMainDisplayedCards([]);
    setSavedDisplayedCards([]);
    setPreloaderIsActive(false);
    setSearchErrorIsActive(false);
    setSearchErrorMessage('');
    setServerMessage({
      text: '',
      isError: null,
    });
    setIsInfoTooltipPopupOpen(false);
  }

  function handleSearchMovies(pageName, checked, searchText) {
    setSearchErrorMessage('');
    setSearchErrorIsActive(false);

    if (pageName === 'movies') {
      localStorage.setItem('mainMoviesSearchText', searchText);

      if (!searchText) {
        localStorage.removeItem('filteredMainMovies');
        localStorage.removeItem('mainMoviesSearchText');
        return;
      }

      if (!checkArrayfulness(mainMovies)) {
        setPreloaderIsActive(true);
        moviesApi.getMoviesList()
          .then((data) => {
            // throw new Error('Ошибка для тестирования приложения при возникновении ошибок во время запроса');
            const filteredMovies = filterMovies(data, searchText, checked);
            setMainDisplayedCards(filteredMovies);
            localStorage.setItem('filteredMainMovies', JSON.stringify(filteredMovies));

            if (!filteredMovies.length) {
              setSearchErrorMessage(SEARCH_ERRORS.NOT_FOUND);
              setSearchErrorIsActive(true);
            }
            setMainMovies(data);
            localStorage.setItem('mainMovies', JSON.stringify(data));
          })
          .catch(err => {
            setSearchErrorMessage(SEARCH_ERRORS.SERVER_IS_NOT_AVAILABLE);
            setSearchErrorIsActive(true);
            console.log(err)
          })
          .finally(() => setPreloaderIsActive(false));
      } else {
        const filteredMovies = filterMovies(mainMovies, searchText, checked);
        setMainDisplayedCards(filteredMovies);
        localStorage.setItem('filteredMainMovies', JSON.stringify(filteredMovies));
        if (!filteredMovies.length) {
          setSearchErrorMessage(SEARCH_ERRORS.NOT_FOUND);
          setSearchErrorIsActive(true);
        }
      }
    }

    if (pageName === 'saved-movies') {
      const filteredMovies = filterMovies(savedMovies, searchText, checked);
      setSavedDisplayedCards(filteredMovies);

      if (!filteredMovies.length) {
        setSearchErrorMessage(SEARCH_ERRORS.NOT_FOUND);
        setSearchErrorIsActive(true);
      }
    }
  }

  function handleLikeCard(card) {
    const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === card.movieId);

    if (isSaved) {
      handleRemoveCard(card.movieId);
    } else {
      mainApi.saveMovie(card)
      .then((card) => {
        localStorage.setItem('savedMovies', JSON.stringify([ ...savedMovies, card ]));
        setSavedMovies((movies) => [...movies, card]);
        setSavedDisplayedCards((cards) => [...cards, card]);
      })
      .catch(async (err) => {
        const res = await err.json();

        setServerMessage({
          text: res.message,
          isError: true,
        });
        setIsInfoTooltipPopupOpen(true);

        if (err.status === STATUS_CODE.UNAUTHORIZED) {
          setTimeout(() => {
            handleSignOut();
          }, 3000);
        }
        console.log(err);
      });
    }
  }

  function handleRemoveCard (cardId) {
    mainApi.removeSavedMovie(cardId)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((savedMovie) => savedMovie.movieId !== cardId);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        setSavedDisplayedCards((cards) => cards.filter((card) => card.movieId !== cardId));
      })
      .catch(async (err) => {
        const res = await err.json();

        setServerMessage({
          text: res.message,
          isError: true,
        });
        setIsInfoTooltipPopupOpen(true);

        if (err.status === STATUS_CODE.UNAUTHORIZED) {
          setTimeout(() => {
            handleSignOut();
          }, 3000);
        }
        console.log(err);
      });
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
              <SearchForm pageName={"movies"} onSearchMovies={handleSearchMovies} />
              <Message isActive={searchErrorIsActive} message={searchErrorMessage} />
              <Preloader isActive={preloaderIsActive} />
              <MoviesCardList cards={mainDisplayedCards} savedMovies={savedMovies} onLikeCard={handleLikeCard} pageName={"movies"} nameIdCard={'id'} />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} color={"black"} />
              <SearchForm pageName={"saved-movies"} onSearchMovies={handleSearchMovies} />
              <Message isActive={searchErrorIsActive} message={searchErrorMessage} />
              <Preloader isActive={preloaderIsActive} />
              <MoviesCardList cards={savedDisplayedCards} savedMovies={savedMovies} onLikeCard={handleLikeCard} pageName={"saved-movies"} onRemoveCard={handleRemoveCard} nameIdCard={'movieId'} />
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
              <Register onRegister={handleRegister} serverMessage={serverMessage} />
            )
          }
        />

        <Route
          path="/signin"
          element={
            loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} serverMessage={serverMessage} />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} color={"black"} />
              <Profile onSignOut={handleSignOut} onUpdateUser={handleUpdateUser} serverMessage={serverMessage} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>

      <InfoTooltip message={serverMessage} isOpen={isInfoTooltipPopupOpen} onClose={closeInfoTooltipPopup} />

    </CurrentUserContext.Provider>
  );
}

export default App;
