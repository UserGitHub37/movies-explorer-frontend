import ContainerWrapper from '../../common/ContainerWrapper/ContainerWrapper';

import './Techs.css';

function Techs () {
  return (
    <section className="techs">
      <ContainerWrapper className={"container-wrapper__color_black"}>
        <div className="techs__container">
          <h2 className="techs__title">Технологии</h2>
          <div className="techs__line"></div>
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__cards-wrapper">
            <li className="techs__card"><p className="techs__card-item">HTML</p></li>
            <li className="techs__card"><p className="techs__card-item">CSS</p></li>
            <li className="techs__card"><p className="techs__card-item">JS</p></li>
            <li className="techs__card"><p className="techs__card-item">React</p></li>
            <li className="techs__card"><p className="techs__card-item">Git</p></li>
            <li className="techs__card"><p className="techs__card-item">Express.js</p></li>
            <li className="techs__card"><p className="techs__card-item">mongoDB</p></li>
          </ul>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default Techs;
