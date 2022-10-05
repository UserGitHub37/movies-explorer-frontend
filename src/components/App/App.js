import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

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

function App() {

  useEffect(() => {
    if (!sessionStorage.getItem('cards')) {
      console.log('cards в sessionStorage нет');

      moviesApi.getCardList()
      .then((initialCards) => {
        sessionStorage.setItem('cards', JSON.stringify(initialCards));
      })
      .catch(err => console.log(err));
    } else {
      console.log('cards в sessionStorage есть');
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header loggedIn={false} color={"dark-blue"} />
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
            <Header loggedIn={true} color={"black"} />
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
            <Header loggedIn={true} color={"black"} />
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
          <Register />
        }
      />

      <Route
        path="/signin"
        element={
          <Login />
        }
      />

      <Route
        path="/profile"
        element={
          <>
            <Header loggedIn={true} color={"black"} />
            <Profile />
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
