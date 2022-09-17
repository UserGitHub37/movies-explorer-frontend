import './ContainerWrapper.css';

function ContainerWrapper ({ className, children }) {
  let finalClassName = 'container-wrapper';
  if (className) finalClassName += ` ${className}`;
  return (
    <div className={finalClassName}>{children}</div>
  );
}

export default ContainerWrapper;
