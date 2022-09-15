import './ContainerWrapper.css';

function ContainerWrapper ({ className, children }) {
  const finalClassName = `container-wrapper ${className}`;
  return (
    <div className={finalClassName}>{children}</div>
  );
}

export default ContainerWrapper;
