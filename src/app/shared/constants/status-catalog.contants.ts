import { Stepper } from '../interfaces/stepper.interface';

export const STATUS_CATALOG: Stepper[] = [
  {
    idTrakingStatusCode: 2,
    deliveryDate: '',
    icon: 'unblock-card',
    status: '',
    title: 'Estamos preparando tu tarjeta',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 6,
    deliveryDate: '',
    icon: 'product-delivery',
    status: '',
    title: 'Enviamos la tarjeta a tu domicilio',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 16,
    deliveryDate: '',
    icon: 'close-1px',
    status: '',
    title: 'Intento de entrega sin éxito',
    description: 'Se realizará otro intento de entrega en los siguientes días',
    reasonCode: [10, 11, 12, 13]
  },
  {
    idTrakingStatusCode: 9,
    deliveryDate: '',
    icon: 'product-delivery',
    status: '',
    title: 'Enviamos tu tarjeta a la sucursal',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 10,
    deliveryDate: '',
    icon: 'location-active',
    status: '',
    title: 'Entregamos tu tarjeta en la sucursal',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 8,
    deliveryDate: '',
    icon: 'home',
    status: '',
    title: 'Entregamos la tarjeta en tu domicilio',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 22,
    deliveryDate: '',
    icon: 'close-1px',
    status: '',
    title: 'No se recogió la tarjeta en la sucursal',
    reasonCode: [1]
  }
];

export const REASON_CODES = [0, 1];

export const HOME_DELIVERY = [
  { trakingStatusCode: 2, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 6, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 8, reasonCode: [...REASON_CODES] }
];

export const BRANCH_DELIVERY = [
  { trakingStatusCode: 2, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 9, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 10, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 8, reasonCode: [...REASON_CODES] }
];

export const RESCUE_DELIVERY = [
  { trakingStatusCode: 2, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 6, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 9, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 0, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 10, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 8, reasonCode: [...REASON_CODES] }
];
