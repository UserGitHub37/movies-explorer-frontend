import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) => {
  if (loggedIn === undefined) {
    return null;
  }

  return loggedIn ? children : <Navigate to='/' />
};

export default ProtectedRoute;
