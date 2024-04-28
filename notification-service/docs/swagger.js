const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs"); // No need to require js-yaml

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
            example: "PENDING",
          },
        },
      },
    },
  },
};

// Options for Swagger
const options = {
  swaggerDefinition,
  apis: ["./routes/*.ts"], // Ensure this path matches your actual API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Function to generate JSON documentation
function generateJsonDoc() {
  const jsonContent = JSON.stringify(swaggerSpec, null, 2); // Beautify the JSON output
  fs.writeFileSync("./swagger.json", jsonContent);
}

// Call the function to generate the JSON file
generateJsonDoc();
