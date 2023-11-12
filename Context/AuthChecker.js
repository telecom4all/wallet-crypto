import React from 'react';
import { useAuth } from './AuthContext';  // Adjust the import path according to your project structure

function AuthChecker({ navigation }) {
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      navigation.navigate(isAuthenticated ? 'Home' : 'Login');
    }
  }, [isAuthenticated, isLoading, navigation]);

  return null;
}

export default AuthChecker;