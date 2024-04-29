const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");

// Swagger configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API",
    version: "1.0.0",
    description: "API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Development Server",
    },
  ],
  components: {
    schemas: {
      appointment: {
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
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

function generateJsonDoc() {
  const jsonContent = JSON.stringify(swaggerSpec, null, 2);
  fs.writeFileSync("./swagger.json", jsonContent);
}

generateJsonDoc();
