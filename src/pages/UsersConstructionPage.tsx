import React from 'react';
import { Wrench } from 'lucide-react';

const UsersConstructionPage: React.FC = () => {
  return (
    <div className="glass rounded-2xl shadow-lg p-5">
      <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '400px' }}>
        <div className="d-inline-flex align-items-center justify-content-center rounded-2xl mb-4 shadow corazon" style={{ width: '6rem', height: '6rem' }}>
          <Wrench className="text-white" style={{ width: '3rem', height: '3rem' }} />
        </div>
        <h2 className="display-5 fw-bold text-gray-900 mb-3">Sitio en Construcción</h2>
        <p className="text-gray-600 fs-5 mb-0">
          Estamos trabajando en la gestión de usuarios. Pronto estará disponible.
        </p>
      </div>
    </div>
  );
};

export default UsersConstructionPage;

