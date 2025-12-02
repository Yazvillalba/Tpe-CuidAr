import React from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, MapPin, DollarSign, Clock, User, FileText } from 'lucide-react';
import type { Solicitud } from '../types/worker';

interface SolicitudDetailModalProps {
  show: boolean;
  onHide: () => void;
  solicitud: Solicitud | null;
  onPostular?: () => void;
  yaPostulado?: boolean;
  postulando?: boolean;
}

const SolicitudDetailModal: React.FC<SolicitudDetailModalProps> = ({
  show,
  onHide,
  solicitud,
  onPostular,
  yaPostulado = false,
  postulando = false,
}) => {
  if (!show || !solicitud) return null;

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
        bottom: 0,
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
                <Briefcase className="text-white" style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <h5 className="modal-title fw-semibold text-gray-900 mb-0">Detalles de la Solicitud</h5>
                <p className="small text-gray-500 mb-0">Información completa del trabajo</p>
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

          <div className="modal-body px-4 py-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Briefcase className="text-primary" style={{ width: '24px', height: '24px' }} />
                <h4 className="fw-bold text-gray-900 mb-0">{solicitud.tipoCuidado}</h4>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-xl">
                    <User className="text-gray-400 mt-1" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                    <div>
                      <p className="small text-gray-600 mb-1 fw-semibold">Familia</p>
                      <p className="text-gray-900 mb-0">{solicitud.familia.nombre}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-xl">
                    <MapPin className="text-gray-400 mt-1" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                    <div>
                      <p className="small text-gray-600 mb-1 fw-semibold">Ubicación</p>
                      <p className="text-gray-900 mb-0">{solicitud.ubicacion}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-xl">
                    <DollarSign className="text-gray-400 mt-1" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                    <div>
                      <p className="small text-gray-600 mb-1 fw-semibold">Tarifa por Hora</p>
                      <p className="text-gray-900 mb-0 fw-bold">${solicitud.tarifaPorHora}</p>
                    </div>
                  </div>
                </div>

                {solicitud.horasSemanales && (
                  <div className="col-12">
                    <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-xl">
                      <Clock className="text-gray-400 mt-1" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                      <div>
                        <p className="small text-gray-600 mb-1 fw-semibold">Horas Semanales</p>
                        <p className="text-gray-900 mb-0">{solicitud.horasSemanales} horas/semana</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-12">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-xl">
                    <FileText className="text-gray-400 mt-1" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                    <div>
                      <p className="small text-gray-600 mb-2 fw-semibold">Descripción</p>
                      <p className="text-gray-900 mb-0" style={{ lineHeight: '1.6' }}>
                        {solicitud.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
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
              Cerrar
            </button>
            {onPostular && (
              yaPostulado ? (
                <span className="badge bg-success rounded-xl px-3 py-2" style={{ fontSize: '0.875rem' }}>
                  Ya postulado
                </span>
              ) : (
                <button
                  type="button"
                  className="btn btn-gradient text-white rounded-xl px-4 d-flex align-items-center gap-2"
                  onClick={onPostular}
                  disabled={postulando}
                  style={{ fontSize: '0.875rem' }}
                >
                  {postulando ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Postulando...
                    </>
                  ) : (
                    <>
                      <Briefcase style={{ width: '16px', height: '16px' }} />
                      Postularse
                    </>
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SolicitudDetailModal;

