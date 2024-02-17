export interface IAppointmentProps {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  open_to_earlier: boolean;
  date: Date;
  time: string;
  booked: boolean;
}
