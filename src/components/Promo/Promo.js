import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import './Promo.css';

function Promo () {
  return (
    <ContainerWrapper className={"container-wrapper__color_dark-blue"}>
      <div className='promo'>
        <div className="promo__title-wrapper">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
      </div>
    </ContainerWrapper>
  );
}

export default Promo;
