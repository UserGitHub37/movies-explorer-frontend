import ContainerWrapper from '../../common/ContainerWrapper/ContainerWrapper';

import avaPath from '../../../images/about-me-ava.jpg';

import './AboutMe.css';

function AboutMe () {
  return (
    <section className="about-me">
      <ContainerWrapper className={'container-wrapper__color_black'}>
        <div className="about-me__container">
          <h2 className="about-me__heading">Студент</h2>
          <div className="about-me__line"></div>
          <div className="about-me__card">
            <img src={avaPath} alt="Фото студента" className="about-me__ava" />
            <div className="about-me__description">
              <h2 className="about-me__title">Андрей</h2>
              <h3 className="about-me__subtitle">Фронтенд-разработчик</h3>
              <p className="about-me__paragraph">
                Я родился и живу в Москве, закончил факультет "Автомобили и тракторы" МГТУ "МАМИ" (Московский политех). До моего увлечения фронтенд разработкой 4 года проработал в техподдержке и 5 лет системным администратором. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos at id ad nemo nostrum excepturi recusandae rem iusto, consequuntur facere possimus odit libero numquam eaque in enim repudiandae minus mollitia?
              </p>
              <a href="https://github.com/UserGitHub37" className="about-me__link">Github</a>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default AboutMe;
