import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UsersProvider } from './contexts/UsersContext';
import Login from './components/Login';
import AdminPage from './pages/AdminPage';
import WorkerPage from './pages/WorkerPage';
import ConstructionPage from './pages/ConstructionPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <UsersProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/worker" 
                element={
                  <ProtectedRoute requiredRole="worker">
                    <WorkerPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/construction" 
                element={
                  <ProtectedRoute>
                    <ConstructionPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </UsersProvider>
  );
};

export default App;

