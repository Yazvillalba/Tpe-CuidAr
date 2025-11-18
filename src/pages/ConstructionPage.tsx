import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, LogOut, Wrench } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ConstructionPage: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen gradient-bg">
      <header className="glass border-bottom border-white/20 shadow-sm">
        <div className="container-fluid max-w-7xl mx-auto px-4">
          <div className="d-flex justify-content-between align-items-center" style={{ height: '4rem' }}>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-center rounded-xl me-3 corazon" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Heart className="text-white" style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <h1 className="h3 fw-bold text-gray-900 mb-0">CuidAR</h1>
            </div>
            
            <div className="d-flex align-items-center">
              <div className="text-end me-3">
                <p className="small fw-medium text-gray-900 mb-0">{user?.username}</p>
                <p className={`text-xs px-2 py-1 rounded-full mb-0 ${
                  user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user?.role === 'worker' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {user?.role === 'admin' ? 'Administrador' :
                   user?.role === 'worker' ? 'Cuidador' :
                   'Familia'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn d-flex align-items-center text-muted"
                title="Cerrar sesión"
                style={{ background: 'none', border: 'none' }}
              >
                <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-fluid max-w-7xl mx-auto px-4 py-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 8rem)' }}>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-2xl mb-4 shadow corazon" style={{ width: '6rem', height: '6rem' }}>
              <Wrench className="text-white" style={{ width: '3rem', height: '3rem' }} />
            </div>
            <h2 className="display-5 fw-bold text-gray-900 mb-3">Página en Construcción</h2>
            <p className="text-gray-600 fs-5 mb-0">
              Estamos trabajando en esta sección. Pronto estará disponible.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConstructionPage;

