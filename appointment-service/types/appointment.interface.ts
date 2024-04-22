export interface IAppointmentProps {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  open_to_earlier: boolean;
  date: Date;
  time: string;
  isPending: boolean;
  status: AppointmentStatus;
}

export interface IUpdateAppointmentProps {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  open_to_earlier: boolean;
  isPending: boolean;
  status: AppointmentStatus;
}

export enum AppointmentStatus {
  BOOKED = "BOOKED",
  CANCELED = "CANCELED",
  CONFIRMED = "CONFIRMED",
}
