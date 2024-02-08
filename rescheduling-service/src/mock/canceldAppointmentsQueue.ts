// Here is some mock data to simulate the queue of appointments that need to be cancelled

import { Appointment } from '../types/appointmentTypes';

export const cancelAppointmentsQueue: Appointment[] = [
  {
    id: 1,
    date: new Date('2021-06-01T09:00:00'),
    patientId: 1,
  },
  {
    id: 2,
    date: new Date('2021-06-01T09:30:00'),
    patientId: 2,
  },
  {
    id: 3,
    date: new Date('2021-06-01T10:00:00'),
    patientId: 3,
  },
  {
    id: 4,
    date: new Date('2021-06-01T10:30:00'),
    patientId: 4,
  },
  {
    id: 5,
    date: new Date('2021-06-01T11:00:00'),
    patientId: 5,
  },
  {
    id: 6,
    date: new Date('2021-06-01T11:30:00'),
    patientId: 6,
  },
  {
    id: 7,
    date: new Date('2021-06-01T12:00:00'),
    patientId: 7,
  },
  {
    id: 8,
    date: new Date('2021-06-01T12:30:00'),
    patientId: 8,
  },
  {
    id: 9,
    date: new Date('2021-06-01T13:00:00'),
    patientId: 9,
  },
  {
    id: 10,
    date: new Date('2021-06-01T13:30:00'),
    patientId: 10,
  },
];
