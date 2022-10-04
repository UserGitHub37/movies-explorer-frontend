import { useNavigate } from 'react-router-dom';
import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';

import './Page404.css';

function Page404 () {
  const navigate = useNavigate();

  return (
    <ContainerWrapper
      className={"container-wrapper__color_black container-wrapper__type_grow"}
    >
      <div className="page404">
        <div className="page404__title-wrapper">
          <h1 className="page404__title">404</h1>
          <p className="page404__subtitle">Страница не найдена</p>
        </div>
        <button type="button" className="page404__back-btn" onClick={() => navigate(-1)}>Назад</button>
      </div>
    </ContainerWrapper>
  );
};

export default Page404;
