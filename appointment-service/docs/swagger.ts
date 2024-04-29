import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
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
        url: "http://localhost:3001/",
        description: "Local server",
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
    components: {
      schemas: {
        createAppointmentBody: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "60564fcb544047cdc3844818",
            },
            email: {
              type: "string",
              example: "john.snow@email.com",
            },
            first_name: {
              type: "string",
              example: "John",
            },
            last_name: {
              type: "string",
              example: "Snow",
            },
            open_to_earlier: {
              type: "boolean",
              example: true,
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2024-04-17T12:00:00Z",
            },
            time: {
              type: "string",
              example: "09:00 AM",
            },
            isPending: {
              type: "boolean",
              example: true,
            },
            status: {
              type: "string",
              example: "PENDING",
            },
          },
        },
        updateAppointmentBody: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "john.snow@email.com",
            },
            first_name: {
              type: "string",
              example: "John",
            },
            last_name: {
              type: "string",
              example: "Snow",
            },
            open_to_earlier: {
              type: "boolean",
              example: true,
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2024-04-17T12:00:00Z",
            },
          },
        },
        changeAppointmentPendingStatusBody: {
          type: "object",
          properties: {
            isPending: {
              type: "boolean",
              example: false,
            },
          },
        },
      },
    },
  },
  apis: ["./router/adminRouter.ts", "./router/patientRouter.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
