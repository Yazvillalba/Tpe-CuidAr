import type { Solicitud } from '../types/worker';

export const solicitudesHardcodeadas: Solicitud[] = [
  {
    idSolicitud: 1,
    tipoCuidado: 'Cuidado de adulto mayor',
    descripcion: 'Buscamos un cuidador para acompañar a nuestro familiar de 75 años. Requiere asistencia con actividades diarias y compañía.',
    ubicacion: 'Palermo, CABA',
    tarifaPorHora: 2500,
    horasSemanales: 20,
    idFamilia: 3, 
    familia: {
      nombre: 'Familia Rodríguez',
      ubicacion: 'Palermo, CABA',
    },
  },
  {
    idSolicitud: 2,
    tipoCuidado: 'Cuidado de niño',
    descripcion: 'Necesitamos una cuidadora para nuestro hijo de 5 años. Horario de lunes a viernes de 8 a 13hs.',
    ubicacion: 'Belgrano, CABA',
    tarifaPorHora: 3000,
    horasSemanales: 25,
    idFamilia: 4, 
    familia: {
      nombre: 'Familia Martínez',
      ubicacion: 'Belgrano, CABA',
    },
  },
  {
    idSolicitud: 3,
    tipoCuidado: 'Cuidado de adulto mayor',
    descripcion: 'Buscamos cuidador para persona con movilidad reducida. Requiere ayuda con movilización y medicación.',
    ubicacion: 'San Telmo, CABA',
    tarifaPorHora: 2800,
    horasSemanales: 30,
    idFamilia: 3,
    familia: {
      nombre: 'Familia López',
      ubicacion: 'San Telmo, CABA',
    },
  },
];

