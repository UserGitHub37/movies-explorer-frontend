import ContainerWrapper from '../../common/ContainerWrapper/ContainerWrapper';
import './HeaderBanner.css';

function HeaderBanner () {
  return (
    <ContainerWrapper className={"container-wrapper__color_dark-blue"}>
      <div className='header-banner'>
        <div className="header-banner__title-wrapper">
          <h1 className="header-banner__title">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
      </div>
    </ContainerWrapper>
  );
}

export default HeaderBanner;
