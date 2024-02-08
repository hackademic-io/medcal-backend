export type CanceledAppointment = {
  id: number;
  date: Date;
  patientId: number;
};

export type ReschedulingOffer = {
  date: Date;
  newPatientId: number;
};
