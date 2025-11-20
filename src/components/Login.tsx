import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
    
        const role = localStorage.getItem('userRole');
        if (role === 'admin') {
          navigate('/admin');
        } else {
          
          navigate('/construction');
        }
      } else {
        setLoginError('Usuario o contraseña incorrectos');
      }
    } catch (error: any) {
      setLoginError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center p-4 gradient-bg">
      <div className="w-100" style={{ maxWidth: '28rem' }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-2xl mb-3 shadow corazon" style={{ width: '4rem', height: '4rem' }}>
            <Heart className="text-white" style={{ width: '2rem', height: '2rem' }} />
          </div>
          <h1 className="display-6 fw-bold text-gray-900 mb-2">CuidAR</h1>
          <p className="text-gray-600">Tu plataforma de cuidado integral</p>
        </div>

        <div className="glass rounded-2xl shadow p-4">
          <div className="text-center mb-4">
            <h2 className="h3 fw-semibold text-gray-900 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600">Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-gray-700">Usuario</label>
              <div className="position-relative">
                <User className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ width: '1.25rem', height: '1.25rem' }} />
                <input
                  id="username"
                  type="text"
                  className="form-control ps-5"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-gray-700">Contraseña</label>
              <div className="position-relative">
                <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ width: '1.25rem', height: '1.25rem' }} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control ps-5 pe-5"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="btn position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                  style={{ background: 'none', border: 'none' }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                  ) : (
                    <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="alert alert-danger rounded-xl small mb-3">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-100 btn btn-gradient fw-medium shadow"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <div className="d-flex align-items-center mb-2">
              <Shield className="text-blue-600 me-2" style={{ width: '1rem', height: '1rem' }} />
              <span className="small fw-medium text-blue-800">Credenciales de demostración:</span>
            </div>
            <div className="small text-blue-700">
              <p className="mb-1"><strong>Admin:</strong> usuario: admin, contraseña: admin123</p>
              <p className="mb-1"><strong>Cuidador:</strong> usuario: cuidador1, contraseña: cuidador123</p>
              <p className="mb-0"><strong>Familia:</strong> usuario: familia1, contraseña: familia123</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-muted small">
          <p>&copy; 2024 CuidAR. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

