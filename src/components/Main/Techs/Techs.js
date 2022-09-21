import ContainerWrapper from '../../common/ContainerWrapper/ContainerWrapper';

import './Techs.css';

function Techs () {
  return (
    <section className="techs">
      <ContainerWrapper className={"techs__container-wrapper"}>
        <div className="techs__container">
          <h2 className="techs__title">Технологии</h2>
          <div className="techs__line"></div>
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__cards-wrapper">
            <li className="techs__card">HTML</li>
            <li className="techs__card">CSS</li>
            <li className="techs__card">JS</li>
            <li className="techs__card">React</li>
            <li className="techs__card">Git</li>
            <li className="techs__card">Express.js</li>
            <li className="techs__card">mongoDB</li>
          </ul>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default Techs;
