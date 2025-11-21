import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2 } from 'lucide-react';
import type { User } from '../types';
import { useUsers } from '../contexts/UsersContext';
import { useAuth } from '../contexts/AuthContext';

interface DeleteUserModalProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
  onSuccess?: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ show, onHide, user, onSuccess }) => {
  const { deleteUser } = useUsers();
  const { user: currentUser } = useAuth();

  const handleDelete = () => {
    if (!user) return;

    if (user.username === currentUser?.username) {
      alert('No puedes eliminar tu propia cuenta');
      return;
    }

    deleteUser(user.username);
    onHide();
    if (onSuccess) onSuccess();
  };

  if (!show || !user) return null;

  return createPortal(
    <div 
      className="modal fade show" 
      style={{ 
        display: 'block', 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        zIndex: 1050,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onClick={onHide}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px' }}
      >
        <div className="modal-content glass rounded-2xl shadow-xl border-0 overflow-hidden">
          <div className="modal-header border-bottom border-gray-200 bg-transparent px-4 py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-red-100 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <AlertTriangle className="text-red-600" style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <h5 className="modal-title fw-semibold text-gray-900 mb-0">Confirmar Eliminación</h5>
                <p className="small text-gray-500 mb-0">Esta acción no se puede deshacer</p>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onHide}
              aria-label="Close"
              style={{ fontSize: '0.875rem' }}
            ></button>
          </div>
          <div className="modal-body px-4 py-4">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-xl d-inline-block mb-4">
                <AlertTriangle className="text-red-600" style={{ width: '3rem', height: '3rem' }} />
              </div>
              <h6 className="fw-semibold text-gray-900 mb-3" style={{ fontSize: '1.1rem' }}>
                ¿Estás seguro de que quieres eliminar este usuario?
              </h6>
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <p className="text-gray-700 mb-1 fw-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500 small mb-0">
                  {user.email} • {user.username}
                </p>
              </div>
              <p className="text-gray-600 mb-0 small">
                El usuario será <strong className="text-red-600">eliminado permanentemente</strong> y no podrá recuperarse.
              </p>
            </div>
          </div>
          <div className="modal-footer border-top border-gray-200 bg-transparent px-4 py-3">
            <button 
              type="button" 
              className="btn btn-secondary rounded-xl px-4" 
              onClick={onHide}
              style={{ fontSize: '0.875rem' }}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-danger text-white rounded-xl px-4 d-flex align-items-center gap-2"
              onClick={handleDelete}
              style={{ fontSize: '0.875rem' }}
            >
              <Trash2 style={{ width: '16px', height: '16px' }} />
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteUserModal;

