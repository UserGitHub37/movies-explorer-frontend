import React from 'react'
import ContainerWrapper from '../ContainerWrapper/ContainerWrapper';
import './Preloader.css'

function Preloader({ isActive }) {
  return (
    <ContainerWrapper className={"container-wrapper__color_black container-wrapper__type_grow"}>
      {isActive && (
        <div className="preloader">
          <div className="preloader__container">
            <span className="preloader__round"></span>
          </div>
        </div>
      )}
    </ContainerWrapper>
  );
}

export default Preloader
