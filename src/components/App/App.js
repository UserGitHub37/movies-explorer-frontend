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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header>
              <ContainerWrapper className={'container-wrapper__color_dark-blue'}>
                <MainHeader>
                  <AuthNav/>
                </MainHeader>
                <HeaderBanner/>
              </ContainerWrapper>
              <ContainerWrapper className={'container-wrapper__color_grey'}>
                <MainPageNav/>
              </ContainerWrapper>
            </Header>
          </>
        }
      />

      <Route
        path="/movies"
        element={
          <>
            <Header>
            <ContainerWrapper className={'container-wrapper__color_dark-blue'}>
                <MainHeader>
                  <SiteNav/>
                  <AuthNav/>
                </MainHeader>
              </ContainerWrapper>
            </Header>
          </>
        }
      />

      <Route
        path="/saved-movies"
        element={
          <>
            <Header>
            <ContainerWrapper className={'container-wrapper__color_dark-blue'}>
                <MainHeader>
                  <SiteNav/>
                  <AuthNav/>
                </MainHeader>
              </ContainerWrapper>
            </Header>
          </>
        }
      />

    </Routes>
  );
}

export default App;
