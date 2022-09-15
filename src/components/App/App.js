import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header>

            </Header>
          </>
        }
      />

      <Route
        path="/movies"
        element={
          <>
            <Header isSiteNavActive={true}>

            </Header>
          </>
        }
      />
    </Routes>
  );
}

export default App;
