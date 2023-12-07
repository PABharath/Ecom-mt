// ProtectedRoute.js

import { Navigate } from 'react-router-dom';  
import useAuth from '../Auth2/useAuth';

const ProtectedRoute = ({children}) => {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />; 
  }

  return children;

}

export default ProtectedRoute;