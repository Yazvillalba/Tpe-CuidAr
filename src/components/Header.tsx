import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      admin: { text: 'Administrador', class: 'bg-red-100 text-red-800' },
      worker: { text: 'Cuidador', class: 'bg-green-100 text-green-800' },
      family: { text: 'Familia', class: 'bg-blue-100 text-blue-800' }
    };
    return roleLabels[role as keyof typeof roleLabels] || { text: role, class: '' };
  };

  const roleInfo = user ? getRoleLabel(user.role) : { text: '', class: '' };

  return (
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
            <button className="btn p-2 text-muted me-2">
              <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <button className="btn p-2 text-muted me-3">
              <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <div className="d-flex align-items-center">
              <div className="text-end me-3">
                <p className="small fw-medium text-gray-900 mb-0">
                  {user ? `${user.firstName} ${user.lastName}` : ''}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${roleInfo.class}`}>
                  {roleInfo.text}
                </span>
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
      </div>
    </header>
  );
};

export default Header;

