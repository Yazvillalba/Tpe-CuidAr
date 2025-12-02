
export interface Solicitud {
  idSolicitud: number;
  tipoCuidado: string;
  descripcion: string;
  ubicacion: string;
  tarifaPorHora: number;
  horasSemanales?: number;
  idFamilia: number;
  familia: {
    nombre: string;
    ubicacion: string;
  };
}

export interface Postulacion {
  idPostulacion: number;
  idCuidador: number;
  idFamilia: number;
  idSolicitud?: number;
  estado: string;
  mensaje?: string;
  familia: {
    idUsuario: number;
    nombre: string;
    email: string;
  };
  fechaAlta: string;
}

export interface Cuidador {
  idCuidador: number;
  idUsuario: number;
  telefono?: string;
  ubicacion?: string;
  descripcion?: string;
  tipoCuidado?: string;
  tarifaPorHora: number;
  anosExperiencia: number;
  calificacion: number;
  estado: string;
  usuario: {
    idUsuario: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    image?: string;
  };
}

export interface WorkerDashboardStats {
  solicitudesDisponibles: number;
  calificacion: number;
  tarifaPorHora: number;
}

