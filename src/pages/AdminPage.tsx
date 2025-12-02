import React, { useState } from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import UserTable from '../components/UserTable';
import { useAuth } from '../contexts/AuthContext';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard');
  
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Administrador';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      
      <main className="container-fluid max-w-7xl mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="display-6 fw-bold text-gray-900 mb-2">Bienvenido, {userName}</h2>
          <p className="text-gray-600">Gestiona usuarios y supervisa la plataforma CuidAR</p>
        </div>

        <div className="mb-4">
          <nav className="nav nav-tabs" id="tabNavigation">
            <button
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Gestión de Usuarios
            </button>
          </nav>
        </div>

        <div id="tabContent">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

