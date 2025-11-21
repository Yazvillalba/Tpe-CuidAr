import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { UserPlus, X, User as UserIcon, Mail, Lock, Image as ImageIcon } from 'lucide-react';
import type { User } from '../types';
import { useUsers } from '../contexts/UsersContext';

interface CreateUserModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ show, onHide, onSuccess }) => {
  const { users, addUser } = useUsers();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '' as User['role'] | '',
    password: '',
    profileImage: null as File | null
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profileImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const existingUser = users.find(u => u.username === formData.username);
    if (existingUser) {
      setError('El nombre de usuario ya existe');
      return;
    }

    if (!formData.username || !formData.email || !formData.firstName || 
        !formData.lastName || !formData.role || !formData.password) {
      setError('Por favor, complete todos los campos requeridos');
      return;
    }

    let imageBase64 = '';
    if (formData.profileImage) {
      imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(formData.profileImage!);
      });
    }

    const newUser: User = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role as User['role'],
      status: 'active',
      image: imageBase64 || undefined
    };

    addUser(newUser);
    

    setFormData({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '' as User['role'] | '',
      password: '',
      profileImage: null
    });
    
    onHide();
    if (onSuccess) onSuccess();
  };

  if (!show) return null;

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
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <div className="modal-content glass rounded-2xl shadow-xl border-0 overflow-hidden">
          <div className="modal-header border-bottom border-gray-200 bg-transparent px-4 py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="corazon rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <UserPlus className="text-white" style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <h5 className="modal-title fw-semibold text-gray-900 mb-0">Crear Nuevo Usuario</h5>
                <p className="small text-gray-500 mb-0">Complete el formulario para agregar un nuevo usuario</p>
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
          <form onSubmit={handleSubmit}>
            <div className="modal-body px-4 py-3" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {error && (
                <div className="alert alert-danger rounded-xl d-flex align-items-center gap-2 mb-4" role="alert">
                  <X style={{ width: '18px', height: '18px' }} />
                  <span className="small">{error}</span>
                </div>
              )}
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-gray-700 mb-2 d-flex align-items-center gap-2">
                    <UserIcon style={{ width: '16px', height: '16px' }} />
                    Nombre de Usuario
                  </label>
                  <input 
                    type="text" 
                    name="username"
                    className="form-control border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    placeholder="Ingrese el nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-gray-700 mb-2 d-flex align-items-center gap-2">
                    <Mail style={{ width: '16px', height: '16px' }} />
                    Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    placeholder="usuario@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-gray-700 mb-2">Nombre</label>
                  <input 
                    type="text" 
                    name="firstName"
                    className="form-control border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-gray-700 mb-2">Apellido</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className="form-control border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-gray-700 mb-2">Rol</label>
                  <select 
                    name="role"
                    className="form-select border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar rol</option>
                    <option value="admin">Administrador</option>
                    <option value="worker">Cuidador</option>
                    <option value="family">Familia</option>
                  </select>
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-gray-700 mb-2 d-flex align-items-center gap-2">
                    <Lock style={{ width: '16px', height: '16px' }} />
                    Contraseña
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    className="form-control border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="col-12">
                  <label className="form-label small fw-semibold text-gray-700 mb-2 d-flex align-items-center gap-2">
                    <ImageIcon style={{ width: '16px', height: '16px' }} />
                    Foto de Perfil <span className="text-muted fw-normal">(opcional)</span>
                  </label>
                  <input 
                    type="file" 
                    name="profileImage"
                    accept="image/*" 
                    className="form-control border border-gray-300 rounded-xl px-3 py-2" 
                    style={{ fontSize: '0.875rem' }}
                    onChange={handleFileChange}
                  />
                  {formData.profileImage && (
                    <small className="text-muted d-block mt-2">
                      Archivo seleccionado: {formData.profileImage.name}
                    </small>
                  )}
                </div>
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
                type="submit" 
                className="btn btn-gradient text-white rounded-xl px-4 d-flex align-items-center gap-2"
                style={{ fontSize: '0.875rem' }}
              >
                <UserPlus style={{ width: '16px', height: '16px' }} />
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CreateUserModal;

