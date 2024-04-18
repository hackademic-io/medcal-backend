const createAppointmentBody = {
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
};

const updateAppointmentBody = {
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
};

const changeAppointmentPendingStatusBody = {
  type: "object",
  properties: {
    isPending: {
      type: "boolean",
      example: false,
    },
  },
};

const createAppointment = {
  tags: ["Appointment - admin router"],
  description: "Create a new appointment",
  operationId: "createAppointment",
  security: [
    {
      hash: "",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createAppointmentBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Appointment created successfully!",
      content: {
        "application/json": {
          schema: {
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
        },
      },
    },
    "500": {
      description: "Error creating appointment",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error creating appointment",
              },
            },
          },
        },
      },
    },
  },
};

const getOneAppointment = {
  tags: ["Appointment - admin router"],
  description: "Get one appointment",
  operationId: "getOneAppointment",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Appointment ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    "200": {
      description: "Appointment information:",
      content: {
        "application/json": {
          schema: {
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
        },
      },
    },
    "500": {
      description: "Error fetching one appointment",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error fetching one appointment",
              },
            },
          },
        },
      },
    },
  },
};

const getBookedAppointments = {
  tags: ["Appointment - admin router"],
  description: "Get all booked appointments",
  operationId: "getAllBookedAppointments",
  security: [
    {
      hash: "",
    },
  ],
  parameters: [
    {
      in: "query",
      name: "MaxDate",
      schema: {
        type: "string",
      },
      description:
        "Maximum date for filtering appointments (format: YYYY-MM-DD)",
      required: true,
    },
    {
      in: "query",
      name: "MinDate",
      schema: {
        type: "string",
      },
      description:
        "Minimum date for filtering appointments (format: YYYY-MM-DD)",
      required: true,
    },
  ],
  responses: {
    "201": {
      description: "Appointments fetched successfully",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
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
                  example: "BOOKED",
                },
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Error fetching booked appointments",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error fetching booked appointments",
              },
            },
          },
        },
      },
    },
  },
};

const updateOneAppointment = {
  tags: ["Appointment - admin router"],
  description: "Update one appointment",
  operationId: "updateOneAppointment",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/updateAppointmentBody",
        },
      },
    },
    required: false,
  },
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Appointment ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    "200": {
      description: "Updated appointment information:",
      content: {
        "application/json": {
          schema: {
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
        },
      },
    },
    "500": {
      description: "Error updating appointment",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error updating appointment",
              },
            },
          },
        },
      },
    },
  },
};

const deleteOneAppointment = {
  tags: ["Appointment - admin router"],
  description: "Delete (cancel) appointment",
  operationId: "deleteOneAppointment",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Appointment ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    "200": {
      description: "Canceled appointment information:",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "60564fcb544047cdc3844818",
              },
              email: {
                type: "null",
                example: "null",
              },
              first_name: {
                type: "null",
                example: "null",
              },
              last_name: {
                type: "null",
                example: "null",
              },
              open_to_earlier: {
                type: "boolean",
                example: false,
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
                example: false,
              },
              status: {
                type: "string",
                example: "CANCELED",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Error canceling appointment",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error canceling appointment",
              },
            },
          },
        },
      },
    },
  },
};

const changeAppointmentPendingStatus = {
  tags: ["Appointment - admin router"],
  description: "Update appointment pending status",
  operationId: "updateAppointmentPendingStatus",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/changeAppointmentPendingStatusBody",
        },
      },
    },
    required: true,
  },
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Appointment ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    "200": {
      description: "Appointment pending status:",
      content: {
        "application/json": {
          schema: {
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
    "500": {
      description: "Error changing isPending value",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error changing isPending value",
              },
            },
          },
        },
      },
    },
  },
};

export {
  createAppointmentBody,
  updateAppointmentBody,
  changeAppointmentPendingStatusBody,
  createAppointment,
  getOneAppointment,
  getBookedAppointments,
  updateOneAppointment,
  deleteOneAppointment,
  changeAppointmentPendingStatus,
};
