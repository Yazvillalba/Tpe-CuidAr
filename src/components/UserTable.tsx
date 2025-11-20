import React from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../types';


const HARDCODED_USERS: User[] = [
  { 
    username: 'admin', 
    password: 'admin123', 
    firstName: 'Administrador', 
    lastName: 'Sistema', 
    role: 'admin', 
    email: 'admin@cuidar.com', 
    status: 'active', 
    image: '/Imagenes/Admin.png' 
  },
  { 
    username: 'cuidador1', 
    password: 'cuidador123', 
    firstName: 'María', 
    lastName: 'González', 
    role: 'worker', 
    email: 'maria@cuidar.com', 
    status: 'active', 
    image: '/Imagenes/Trabajador.jpg' 
  },
  { 
    username: 'cuidador2', 
    password: 'cuidador456', 
    firstName: 'Ana', 
    lastName: 'López', 
    role: 'worker', 
    email: 'ana@cuidar.com', 
    status: 'inactive', 
    image: '/Imagenes/Trabajadora1.avif' 
  },
  { 
    username: 'familia1', 
    password: 'familia123', 
    firstName: 'Carlos', 
    lastName: 'Rodríguez', 
    role: 'family', 
    email: 'carlos@cuidar.com', 
    status: 'active', 
    image: '/Imagenes/Familia.jpg' 
  },
  { 
    username: 'familia3', 
    password: 'familia789', 
    firstName: 'Roberto', 
    lastName: 'Pérez', 
    role: 'family', 
    email: 'roberto@cuidar.com', 
    status: 'inactive', 
    image: '/Imagenes/familia2.jpg' 
  }
];

const getRoleText = (role: string) => {
  const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    worker: 'Cuidador',
    family: 'Familia'
  };
  return roleLabels[role] || role;
};

const getRolColorClass = (role: string) => {
  const rolColor: Record<string, string> = {
    admin: 'rolColor-admin',
    worker: 'rolColor-worker',
    family: 'rolColor-family'
  };
  return rolColor[role] || '';
};

const getUserStatus = (status: string) => {
  const statusConfig: Record<string, { text: string; class: string }> = {
    active: { text: 'Activo', class: 'bg-green-100 text-green-800' },
    inactive: { text: 'Inactivo', class: 'bg-red-100 text-red-800' }
  };
  return statusConfig[status] || statusConfig.inactive;
};

const getDefaultImageForRole = (role: string) => {
  if (role === 'worker') return '/Imagenes/Trabajador.jpg';
  if (role === 'family') return '/Imagenes/Familia.jpg';
  return '';
};

const UserTable: React.FC = () => {
  const { user: currentUser } = useAuth();
  const users = HARDCODED_USERS;

 
  const handleButtonClick = () => {
  
  };

  return (
    <div className="glass rounded-2xl shadow-lg">
      <div className="p-4 border-bottom border-gray-200">
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between gap-3">
          <h3 className="h5 fw-semibold text-gray-900 mb-0">Gestión de Usuarios</h3>
          <button
            className="btn btn-gradient d-flex align-items-center px-3 py-2 rounded-xl"
            onClick={handleButtonClick}
          >
            <UserPlus className="me-2" style={{ width: '1rem', height: '1rem' }} />
            Crear Usuario
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-start small fw-medium text-gray-500 text-uppercase">Usuario</th>
              <th className="px-4 py-3 text-start small fw-medium text-gray-500 text-uppercase">Rol</th>
              <th className="px-4 py-3 text-start small fw-medium text-gray-500 text-uppercase">Estado</th>
              <th className="px-4 py-3 text-start small fw-medium text-gray-500 text-uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => {
              const roleText = getRoleText(user.role);
              const rolColorClass = getRolColorClass(user.role);
              const userStatus = getUserStatus(user.status);
              const imageSrc = user.image || getDefaultImageForRole(user.role);

              return (
                <tr key={user.username}>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      {imageSrc && (
                        <img 
                          src={imageSrc} 
                          alt={user.role} 
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%' }}
                          onError={(e) => {
                          
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div>
                        <div className="small fw-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="small text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`badge ${rolColorClass} small`}>{roleText}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      className={`btn btn-sm ${userStatus.class} rounded-pill small fw-semibold`}
                      onClick={handleButtonClick}
                    >
                      {userStatus.text}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm text-sky-600 p-1"
                        title="Editar"
                        onClick={handleButtonClick}
                      >
                        <Edit style={{ width: '1rem', height: '1rem' }} />
                      </button>
                      <button
                        className="btn btn-sm text-red-600 p-1"
                        title="Eliminar"
                        onClick={handleButtonClick}
                      >
                        <Trash2 style={{ width: '1rem', height: '1rem' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

