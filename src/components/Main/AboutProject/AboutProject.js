import ContainerWrapper from '../../common/ContainerWrapper/ContainerWrapper';

import './AboutProject.css';

function AboutProject () {
  return (
    <section className="about-project">
      <ContainerWrapper className={'container-wrapper__color_black'}>
        <div className="about-project__container">
          <h2 className="about-project__title" id="project">О проекте</h2>
          <div className="about-project__line"></div>
          <ul className="about-project__description-cards">
            <li className="about-project__description-card">
              <h3 className="about-project__description-card-title">Дипломный проект включал 5 этапов</h3>
              <p className="about-project__description-card-paragraph">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
              </p>
            </li>
            <li className="about-project__description-card">
            <h3 className="about-project__description-card-title">На выполнение диплома ушло 5 недель</h3>
              <p className="about-project__description-card-paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </li>
          </ul>
          <ul className="about-project__timing">
            <li className="about-project__timing-card">
              <div className="about-project__timing-wrapper about-project__timing-wrapper_color-green">
                <p className="about-project__timing-term">1 неделя</p>
              </div>
              <div className="about-project__timing-wrapper">
                <p className="about-project__timing-task">Back-end</p>
              </div>
            </li>
            <li className="about-project__timing-card">
              <div className="about-project__timing-wrapper about-project__timing-wrapper_color-grey">
                <p className="about-project__timing-term">4 недели</p>
              </div>
              <div className="about-project__timing-wrapper">
                <p className="about-project__timing-task">Front-end</p>
              </div>
            </li>
          </ul>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default AboutProject;
