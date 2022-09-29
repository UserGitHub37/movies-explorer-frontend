import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import './App.css';
import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import Header from '../Header/Header';
import MainHeader from '../Header/MainHeader/MainHeader';
import SiteNav from '../Header/SiteNav/SiteNav';
import AuthNav from '../Header/AuthNav/AuthNav';
import HeaderBanner from '../Header/HeaderBanner/HeaderBanner';
import MainPageNav from '../Header/MainPageNav/MainPageNav';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header>
              <ContainerWrapper
                className={"container-wrapper__color_dark-blue"}
              >
                <MainHeader>
                  <AuthNav />
                </MainHeader>
                <HeaderBanner />
              </ContainerWrapper>
              <ContainerWrapper className={"container-wrapper__color_grey"}>
                <MainPageNav />
              </ContainerWrapper>
            </Header>
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
            <Header>
              <ContainerWrapper
                className={"container-wrapper__color_dark-blue"}
              >
                <MainHeader>
                  <SiteNav />
                </MainHeader>
              </ContainerWrapper>
            </Header>
            <ContainerWrapper className={"container-wrapper__color_black"}>
              <SearchForm />
            </ContainerWrapper>
            <ContainerWrapper className={"container-wrapper__color_black"}>
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
            <Header>
              <ContainerWrapper
                className={"container-wrapper__color_dark-blue"}
              >
                <MainHeader>
                  <SiteNav />
                </MainHeader>
              </ContainerWrapper>
            </Header>
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
    </Routes>
  );
}

export default App;
