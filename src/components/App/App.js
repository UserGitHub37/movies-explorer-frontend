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
  const [mainMovies, setMainMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloaderIsActive, setPreloaderIsActive] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const savedMovies = localStorage.getItem("savedMovies");
    if (savedMovies) {
      setSavedMovies(() => JSON.parse(savedMovies));
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

  useEffect(() => {
    if (location.pathname === '/movies') {
      const filteredMainMovies = localStorage.getItem('filteredMainMovies');
      if (filteredMainMovies) {
        if (localStorage.getItem('isShortMainMovies') === 'true') {
          setMainMovies(() => JSON.parse(filteredMainMovies).filter((card) => card.duration < 40));
        } else {
          setMainMovies(() => JSON.parse(filteredMainMovies));
        }
      } else {
        setMainMovies([]);
      }
    }

    if (location.pathname === '/saved-movies') {
      const filteredSavedMovies = localStorage.getItem('filteredSavedMovies');
      if (filteredSavedMovies) {
        if (localStorage.getItem('isShortSavedMovies') === 'true') {
          setSavedMovies(() => JSON.parse(filteredSavedMovies).filter((card) => card.duration < 40));
        } else {
          setSavedMovies(() => JSON.parse(filteredSavedMovies));
        }
      } else {
        setSavedMovies([]);
      }
    }
  }, [location.pathname]);

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
    setLoggedIn(false);
    navigate('/');
  }

  function handleSearchMovies(searchText) {
    setMainMovies([]);
    if (location.pathname === '/movies') {
      localStorage.setItem('moviesSearchText', searchText);
      if (!searchText) {
        localStorage.removeItem('filteredMainMovies');
      } else if (!localStorage.getItem('mainMovies')) {
        setPreloaderIsActive(true);
        moviesApi.getMoviesList()
          .then((data) => {
            localStorage.setItem('mainMovies', JSON.stringify(data));
            const filteredData = data.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
            if (localStorage.getItem('isShortMainMovies') === 'true') {
              setMainMovies(() => filteredData.filter((card) => card.duration < 40));
            } else {
              setMainMovies(filteredData);
            }
            localStorage.setItem('filteredMainMovies', JSON.stringify(filteredData));
          })
          .catch(err => console.log(err))
          .finally(() => setPreloaderIsActive(false));
      } else {
        const mainMoviesFromStorage = JSON.parse(localStorage.getItem('mainMovies'));
        const filteredData = mainMoviesFromStorage.filter((card) => card.nameRU.toLowerCase().includes(searchText.toLowerCase()));
        if (localStorage.getItem('isShortMainMovies') === 'true') {
          setMainMovies(() => filteredData.filter((card) => card.duration < 40));
        } else {
          setMainMovies(filteredData);
        }
        localStorage.setItem('filteredMainMovies', JSON.stringify(filteredData));
      }
    }
      //! Сделать логику для '/saved-movies'
    if (!searchText) {
      localStorage.removeItem('filteredSavedMovies');
    } else if (location.pathname === '/saved-movies') {
      setSavedMovies([]);
      localStorage.setItem('savedMoviesSearchText', searchText);
      if (!localStorage.getItem('savedMovies')) {
        mainApi.getSavedMoviesList()
          .then((data) => {
            localStorage.setItem('savedMovies', JSON.stringify(data));
            setSavedMovies(data);
          })
          .catch(err => console.log(err));
      } else {
        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
      }
    }
  }

  function handleSetShortMovies(checked) {
    if (location.pathname === '/movies') {
      localStorage.setItem('isShortMainMovies', checked);
      const filteredMainMovies = localStorage.getItem('filteredMainMovies');
      if (filteredMainMovies) {
        if (checked) {
          setMainMovies(() => JSON.parse(filteredMainMovies).filter((card) => card.duration < 40));
        } else {
          setMainMovies(() => JSON.parse(filteredMainMovies));
        }
      } else {
        setMainMovies([])
      }
    }

    if (location.pathname === '/saved-movies') {
      localStorage.setItem('isShortSavedMovies', checked);
      const filteredSavedMovies = localStorage.getItem('filteredSavedMovies');
      if (filteredSavedMovies) {
        if (checked) {
          setSavedMovies(() => JSON.parse(filteredSavedMovies).filter((card) => card.duration < 40));
        } else {
          setSavedMovies(() => JSON.parse(filteredSavedMovies));
        }
      } else {
        setSavedMovies([]);
      }
    }
  }

  function handleLikeCard(card) {
    const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === card.movieId);

    if (isSaved) {
      mainApi.removeSavedMovie(card.movieId)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((savedMovie) => savedMovie.movieId !== card.movieId);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);
      })
      .catch(err => console.log(err));
    } else {
      mainApi.saveMovie(card)
      .then((card) => {
        const updatedSavedMovies = savedMovies.concat(card)
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);
      })
      .catch(err => console.log(err));
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
                <MoviesCardList cards={mainMovies} savedMovies={savedMovies} onLikeCard={handleLikeCard} />
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
                <MoviesCardList cards={savedMovies} savedMovies={savedMovies} onLikeCard={handleLikeCard} />
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
