const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API Documentation",
  },

  paths: {
    "/api/v1/google/peopleAlsoAskQuestions": {
      get: {
        tags: ["google"],
        description: "Get people also ask questions",
        parameters: [
          {
            in: "query",
            name: "searchQuery",
            type: "string",
            required: true,
            description: "The search query",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "number" },
                    message: { type: "string" },
                    data: { type: "object" },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Not found",
          },
          500: {
            description: "Internal Server Error",
          },
          503: {
            description: "Service Unavailable",
          },
        },
      },
    },
  },
};

module.exports = swaggerDocumentation;
