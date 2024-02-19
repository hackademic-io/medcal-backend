export interface IAppointmentProps {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  open_to_earlier: boolean;
  date: Date;
  time: string;
  status: 'BOOKED' | 'CANCELED' | 'CONFIRMED';
}

export interface IUpdateAppointmentProps {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  open_to_earlier: boolean;
  status: 'BOOKED' | 'CANCELED' | 'CONFIRMED';
}
