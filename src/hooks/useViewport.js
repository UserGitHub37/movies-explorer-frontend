import { useState, useEffect } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      let timeOutFunction;
      clearTimeout(timeOutFunction);
      timeOutFunction = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 500);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
}

export default useViewport;
