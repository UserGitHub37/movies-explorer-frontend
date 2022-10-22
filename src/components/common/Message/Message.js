import ContainerWrapper from '../ContainerWrapper/ContainerWrapper';
import './Message.css';

function Message ({ isActive, message }) {



  return (isActive && (
    <ContainerWrapper className={"container-wrapper__color_black container-wrapper__type_grow container-wrapper__type_centre"}>
        <span className="message">{message}</span>
    </ContainerWrapper>
  ))
}

export default Message;
