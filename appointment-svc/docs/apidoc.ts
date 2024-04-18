import {
  createAppointmentBody,
  createAppointment,
  getOneAppointment,
  getBookedAppointments,
  updateOneAppointment,
  deleteOneAppointment,
  updateAppointmentBody,
  changeAppointmentPendingStatus,
  changeAppointmentPendingStatusBody,
} from "./appointment_admin";

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Appointment service - Documentation",
    description:
      "Appointment API is dedicated service to manage all the operations that connected with our Database",
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:4500/",
      description: "Local Server",
    },
  ],
  tags: [
    {
      name: "Appointment - admin router",
    },
    {
      name: "Appointments",
    },
  ],
  paths: {
    appointment: {
      post: createAppointment,
    },
    "appointment/{id}": {
      get: getOneAppointment,
      put: updateOneAppointment,
      delete: deleteOneAppointment,
    },
    "appointment/booked?MaxDate={maxDate}&MinDate={minDate}": {
      get: getBookedAppointments,
    },
    "appointment/changePendingStatus/{id}": {
      put: changeAppointmentPendingStatus,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      hash: {
        type: "apiKey",
      },
    },
    schemas: {
      createAppointmentBody,
      updateAppointmentBody,
      changeAppointmentPendingStatusBody,
    },
  },
};

export { apiDocumentation };
