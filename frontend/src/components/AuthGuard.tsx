// // AuthGuard.tsx

// import React from 'react';
// import { Navigate, Route, RouteProps } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// interface AuthGuardProps extends Omit<RouteProps, 'element'> {
//   // Ajoutez des props personnalisées si nécessaire
// }

// const AuthGuard: React.FC<AuthGuardProps> = ({ element: Element, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
//     />
//   );
// };

// export default AuthGuard;
