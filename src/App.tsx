import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/menu';
import React from 'react';
import Login from './pages/login';
import ProtectedRoute from './components/protectedRoutes/protectedRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
