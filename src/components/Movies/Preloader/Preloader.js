import React from 'react'
import './Preloader.css'

function Preloader({ isActive }) {
  return (
    isActive && (
      <div className="preloader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    )
  );
}

export default Preloader
