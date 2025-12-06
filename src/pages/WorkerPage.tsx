import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { solicitudesHardcodeadas } from '../data/solicitudes';
import type { Solicitud, Postulacion, WorkerDashboardStats, Cuidador } from '../types/worker';
import { ArrowRight, Star, DollarSign, Briefcase, MapPin, Clock } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';
import SolicitudDetailModal from '../components/SolicitudDetailModal';

const WorkerPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast, hideToast, toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'perfil' | 'solicitudes'>('dashboard');
  const [dashboardStats, setDashboardStats] = useState<WorkerDashboardStats>({
    solicitudesDisponibles: solicitudesHardcodeadas.length,
    calificacion: 0,
    tarifaPorHora: 0,
  });
  const [solicitudes] = useState<Solicitud[]>(solicitudesHardcodeadas);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [cuidadorData, setCuidadorData] = useState<Cuidador | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [postulando, setPostulando] = useState<number | null>(null);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);

  const userName = user ? `${user.firstName} ${user.lastName}` : 'Cuidador';

  useEffect(() => {
    if (user) {
      loadCuidadorData();
    }
  }, [user]);

  useEffect(() => {
    if (cuidadorData) {

      setDashboardStats(prev => ({
        ...prev,
        calificacion: cuidadorData.calificacion || 0,
        tarifaPorHora: cuidadorData.tarifaPorHora || 0,
      }));
      

      if (cuidadorData.idCuidador) {
        loadDashboardData();
      } else {

        setLoading(false);
      }
    }
  }, [cuidadorData]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      if (cuidadorData?.idCuidador) {
        try {
          const postulacionesRes = await api.get<Postulacion>(`/postulaciones/cuidador/${cuidadorData.idCuidador}`);
          if (postulacionesRes.success && postulacionesRes.postulaciones) {
            setPostulaciones(postulacionesRes.postulaciones as Postulacion[]);
          } else {
            setPostulaciones([]);
          }
        } catch (error) {
          console.error('Error al cargar postulaciones:', error);
          setPostulaciones([]);
        }
      } 
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCuidadorData = async () => {
    if (user?.idUsuario) {
      try {
        setLoading(true);
        const response = await api.get<Cuidador>(`/cuidadores/usuario/${user.idUsuario}`);
      if (response.success && (response as any).cuidador) {
        const cuidador = (response as any).cuidador as Cuidador;
        setCuidadorData(cuidador);
        setDashboardStats(prev => ({
          ...prev,
          calificacion: cuidador.calificacion || 0,
          tarifaPorHora: cuidador.tarifaPorHora || 0,
        }));
        } else {

          setCuidadorData({
            idCuidador: 0,
            idUsuario: user.idUsuario,
            telefono: '',
            ubicacion: '',
            descripcion: '',
            tipoCuidado: '',
            tarifaPorHora: 0,
            anosExperiencia: 0,
            calificacion: 0,
            estado: 'activo',
            usuario: {
              idUsuario: user.idUsuario,
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              status: user.status,
              image: user.image,
            },
          });
          setLoading(false);
        }
      } catch (error) {
        console.error('Error cargando datos del cuidador:', error);

        setCuidadorData({
          idCuidador: 0,
          idUsuario: user.idUsuario,
          telefono: '',
          ubicacion: '',
          descripcion: '',
          tipoCuidado: '',
          tarifaPorHora: 0,
          anosExperiencia: 0,
          calificacion: 0,
          estado: 'activo',
          usuario: {
            idUsuario: user.idUsuario,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            image: user.image,
          },
        });
        setLoading(false);
      }
    }
  };

  const handlePostular = async (solicitud: Solicitud) => {
    if (!cuidadorData?.idCuidador) {
      showToast('Primero debes completar tu perfil de cuidador', 'warning');
      return;
    }

    const yaPostulado = postulaciones.some(p => 
      p.idSolicitud !== null && 
      p.idSolicitud !== undefined && 
      p.idSolicitud === solicitud.idSolicitud
    );
    if (yaPostulado) {
      showToast('Ya te has postulado a esta solicitud', 'warning');
      return;
    }

    if (postulando === solicitud.idSolicitud) {
      return;
    }

    setPostulando(solicitud.idSolicitud);

    try {

      const response = await api.post<Postulacion>('/postulaciones', {
        idCuidador: cuidadorData.idCuidador,
        idFamilia: solicitud.idFamilia,
        idSolicitud: solicitud.idSolicitud,
      });

      if (response.success && response.postulaciones) {
        setPostulaciones(response.postulaciones as Postulacion[]);
        showToast('¡Te has postulado exitosamente!', 'success');

        if (showSolicitudModal) {
          setShowSolicitudModal(false);
        }

        await loadDashboardData();
      }
    } catch (error: any) {
      console.error('Error postulándose:', error);
      if (error.message && error.message.includes('Ya te has postulado')) {
        await loadDashboardData();
      }
      showToast(error.message || 'Error al postularse', 'error');
    } finally {
      setPostulando(null);
    }
  };

  const handleVerDetalles = (solicitud: Solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowSolicitudModal(true);
  };

  const handlePostularDesdeModal = () => {
    if (selectedSolicitud) {
      handlePostular(selectedSolicitud);
    }
  };

  const handleEliminarPostulacion = async (solicitud: Solicitud) => {
    if (!cuidadorData?.idCuidador) {
      showToast('Error: No se pudo identificar el cuidador', 'error');
      return;
    }

    const postulacion = postulaciones.find(p => 
      p.idSolicitud !== null && 
      p.idSolicitud !== undefined && 
      p.idSolicitud === solicitud.idSolicitud
    );

    if (!postulacion) {
      showToast('No se encontró la postulación', 'warning');
      return;
    }

    try {
      const response = await api.delete<Postulacion>(
        `/postulaciones/cuidador/${cuidadorData.idCuidador}/solicitud/${solicitud.idSolicitud}`
      );

      if (response.success && response.postulaciones) {
        setPostulaciones(response.postulaciones as Postulacion[]);
        showToast('Postulación eliminada exitosamente', 'success');
        await loadDashboardData();
      }
    } catch (error: any) {
      console.error('Error eliminando postulación:', error);
      showToast(error.message || 'Error al eliminar la postulación', 'error');
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.idUsuario) return;

    try {
      const response = await api.put<{ cuidador: Cuidador }>(`/cuidadores/usuario/${user.idUsuario}`, {
        telefono: cuidadorData?.telefono,
        ubicacion: cuidadorData?.ubicacion,
        descripcion: cuidadorData?.descripcion,
        tipoCuidado: cuidadorData?.tipoCuidado,
        tarifaPorHora: cuidadorData?.tarifaPorHora || 0,
        anosExperiencia: cuidadorData?.anosExperiencia || 0,
        calificacion: cuidadorData?.calificacion || 0,
        estado: cuidadorData?.estado || 'activo',
      });

      if (response.success && (response as any).cuidador) {
        const cuidador = (response as any).cuidador as Cuidador;
        setCuidadorData(cuidador);

        setDashboardStats(prev => ({
          ...prev,
          calificacion: cuidador.calificacion || 0,
          tarifaPorHora: cuidador.tarifaPorHora || 0,
        }));
        setIsEditing(false);
        await loadDashboardData();
        showToast('Perfil actualizado exitosamente', 'success');
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      showToast('Error al actualizar el perfil', 'error');
    }
  };

  const isProfileIncomplete = () => {
    if (!cuidadorData) return true;

    return !cuidadorData.idCuidador || 
           !cuidadorData.telefono || 
           !cuidadorData.ubicacion || 
           !cuidadorData.descripcion || 
           !cuidadorData.tipoCuidado ||
           cuidadorData.tarifaPorHora === 0;
  };

  const renderDashboard = () => {
    if (loading && !cuidadorData) {
      return <div className="text-center py-5">Cargando...</div>;
    }


    if (isProfileIncomplete()) {
      return (
        <div className="glass rounded-2xl p-5 shadow-lg">
          <div className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-2xl mb-4 shadow corazon" style={{ width: '5rem', height: '5rem' }}>
              <Briefcase className="text-white" style={{ width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 className="h3 fw-bold text-gray-900 mb-3">Completa tu perfil</h3>
            <p className="text-gray-600 mb-4 fs-5">
              Para poder acceder a todas las funcionalidades y postularte a solicitudes de trabajo, necesitas completar tu perfil de cuidador.
            </p>
            <p className="text-gray-500 mb-4 small">
              Completa información como tu teléfono, ubicación, experiencia y tarifa para que las familias puedan encontrarte.
            </p>
            <button
              className="btn btn-primary btn-lg px-4"
              onClick={() => setActiveTab('perfil')}
            >
              Ir a Mi Perfil
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="glass rounded-2xl p-4 shadow-lg">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="small fw-medium text-gray-600 mb-1">Solicitudes Disponibles</h3>
                  <p className="h2 fw-bold text-gray-900 mb-0">{dashboardStats.solicitudesDisponibles}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <ArrowRight className="text-blue-600" style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass rounded-2xl p-4 shadow-lg">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="small fw-medium text-gray-600 mb-1">Calificación</h3>
                  <p className="h2 fw-bold text-gray-900 mb-0">
                    {dashboardStats.calificacion > 0 ? `${dashboardStats.calificacion}/5` : 'N/A'}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Star className="text-yellow-600" style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass rounded-2xl p-4 shadow-lg">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="small fw-medium text-gray-600 mb-1">Tarifa por Hora</h3>
                  <p className="h2 fw-bold text-gray-900 mb-0">
                    ${dashboardStats.tarifaPorHora || 0}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                  <DollarSign className="text-green-600" style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 shadow-lg">
          <h3 className="h4 fw-bold text-gray-900 mb-4">Solicitudes Recientes</h3>
          {solicitudes.length === 0 ? (
            <p className="text-gray-600">No hay solicitudes disponibles en este momento.</p>
          ) : (
            <div className="list-group">
              {solicitudes.slice(0, 5).map((solicitud) => {

                const yaPostulado = postulaciones.some((p: Postulacion) => 
                  p.idSolicitud !== null && 
                  p.idSolicitud !== undefined && 
                  p.idSolicitud === solicitud.idSolicitud
                );
                return (
                  <div key={solicitud.idSolicitud} className="list-group-item border-0 bg-transparent px-0 py-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-2">
                          <Briefcase className="text-gray-400 me-2" style={{ width: '1rem', height: '1rem' }} />
                          <span className="fw-semibold text-gray-900">{solicitud.tipoCuidado}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <MapPin className="text-gray-400 me-2" style={{ width: '1rem', height: '1rem' }} />
                          <span className="text-gray-600">{solicitud.familia.nombre} - {solicitud.ubicacion}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <DollarSign className="text-gray-400 me-2" style={{ width: '1rem', height: '1rem' }} />
                          <span className="text-gray-600">${solicitud.tarifaPorHora}/hora</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleVerDetalles(solicitud)}
                        >
                          Ver Detalles
                        </button>
                        {yaPostulado && (
                          <button
                            className="badge bg-success border-0"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEliminarPostulacion(solicitud)}
                            title="Haz clic para eliminar la postulación"
                          >
                            Ya postulado
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  const renderPerfil = () => {
    return (
      <div className="glass rounded-2xl p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h4 fw-bold text-gray-900 mb-0">Mi Perfil</h3>
          {!isEditing && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-gray-700">Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={cuidadorData?.telefono || ''}
              onChange={(e) => setCuidadorData(prev => prev ? { ...prev, telefono: e.target.value } : null)}
              disabled={!isEditing}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-gray-700">Ubicación</label>
            <input
              type="text"
              className="form-control"
              value={cuidadorData?.ubicacion || ''}
              onChange={(e) => setCuidadorData(prev => prev ? { ...prev, ubicacion: e.target.value } : null)}
              disabled={!isEditing}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-gray-700">Años de Experiencia</label>
            <input
              type="number"
              className="form-control"
              value={cuidadorData?.anosExperiencia || 0}
              onChange={(e) => setCuidadorData(prev => prev ? { ...prev, anosExperiencia: parseInt(e.target.value) || 0 } : null)}
              disabled={!isEditing}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-gray-700">Tarifa por Hora</label>
            <input
              type="number"
              className="form-control"
              value={cuidadorData?.tarifaPorHora || 0}
              onChange={(e) => setCuidadorData(prev => prev ? { ...prev, tarifaPorHora: parseFloat(e.target.value) || 0 } : null)}
              disabled={!isEditing}
            />
          </div>
          <div className="col-12">
            <label className="form-label text-gray-700">Tipo de Cuidado</label>
            <input
              type="text"
              className="form-control"
              value={cuidadorData?.tipoCuidado || ''}
              onChange={(e) => setCuidadorData(prev => prev ? { ...prev, tipoCuidado: e.target.value } : null)}
              disabled={!isEditing}
              placeholder="Ej: Cuidado de adulto mayor, Cuidado de niño, etc."
            />
          </div>
          <div className="col-12">
            <label className="form-label text-gray-700">Descripción</label>
            <textarea
              className="form-control"
              rows={4}
              value={cuidadorData?.descripcion || ''}
              onChange={(e) => setCuidadorData(prev => prev ? { ...prev, descripcion: e.target.value } : null)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                loadCuidadorData();
              }}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSaveProfile}
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSolicitudes = () => {
    return (
      <div className="glass rounded-2xl p-4 shadow-lg">
        <h3 className="h4 fw-bold text-gray-900 mb-4">Solicitudes Disponibles</h3>
        {solicitudes.length === 0 ? (
          <p className="text-gray-600">No hay solicitudes disponibles en este momento.</p>
        ) : (
          <div className="list-group">
            {solicitudes.map((solicitud) => {

              const yaPostulado = postulaciones.some((p: Postulacion) => 
                p.idSolicitud !== null && 
                p.idSolicitud !== undefined && 
                p.idSolicitud === solicitud.idSolicitud
              );
              return (
                <div key={solicitud.idSolicitud} className="list-group-item border mb-3 rounded-xl">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-2">
                        <Briefcase className="text-primary me-2" style={{ width: '1.25rem', height: '1.25rem' }} />
                        <h5 className="fw-bold text-gray-900 mb-0">{solicitud.tipoCuidado}</h5>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <MapPin className="text-gray-400 me-2" style={{ width: '1rem', height: '1rem' }} />
                        <span className="text-gray-600">{solicitud.familia.nombre} - {solicitud.ubicacion}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{solicitud.descripcion}</p>
                      <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center">
                          <DollarSign className="text-gray-400 me-1" style={{ width: '1rem', height: '1rem' }} />
                          <span className="text-gray-700 fw-semibold">${solicitud.tarifaPorHora}/hora</span>
                        </div>
                        {solicitud.horasSemanales && (
                          <div className="d-flex align-items-center">
                            <Clock className="text-gray-400 me-1" style={{ width: '1rem', height: '1rem' }} />
                            <span className="text-gray-700">{solicitud.horasSemanales} horas/semana</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ms-3">
                      {yaPostulado ? (
                        <button
                          className="badge bg-success border-0"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleEliminarPostulacion(solicitud)}
                          title="Haz clic para eliminar la postulación"
                        >
                          Ya postulado
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handlePostular(solicitud)}
                          disabled={postulando === solicitud.idSolicitud}
                        >
                          {postulando === solicitud.idSolicitud ? 'Postulando...' : 'Postularse'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'perfil':
        return renderPerfil();
      case 'solicitudes':
        return renderSolicitudes();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      
      <SolicitudDetailModal
        show={showSolicitudModal}
        onHide={() => {
          setShowSolicitudModal(false);
          setSelectedSolicitud(null);
        }}
        solicitud={selectedSolicitud}
        onPostular={handlePostularDesdeModal}
        yaPostulado={selectedSolicitud ? postulaciones.some(p => 
          p.idSolicitud !== null && 
          p.idSolicitud !== undefined && 
          p.idSolicitud === selectedSolicitud.idSolicitud
        ) : false}
        postulando={selectedSolicitud ? postulando === selectedSolicitud.idSolicitud : false}
      />
      
      <main className="container-fluid max-w-7xl mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="display-6 fw-bold text-gray-900 mb-2">¡Hola, {userName}!</h2>
          <p className="text-gray-600">Gestiona tu perfil y encuentra nuevas oportunidades de trabajo</p>
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
              className={`nav-link ${activeTab === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveTab('perfil')}
            >
              Mi Perfil
            </button>
            <button
              className={`nav-link ${activeTab === 'solicitudes' ? 'active' : ''}`}
              onClick={() => setActiveTab('solicitudes')}
            >
              Solicitudes
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

export default WorkerPage;
