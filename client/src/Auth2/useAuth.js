// Auth2/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';


const useAuth = () => {
  const authContext = useContext(AuthContext);
  // console.log('authContext:', authContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export default useAuth;
