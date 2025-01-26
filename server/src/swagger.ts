import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apartu API',
      version: '1.0.0',
      description: 'Apartu API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description:'Development server',
      },
    ],
    tags:[
      {
        name: 'Authentication',
        description: 'Authentication related endpoints'
      },
      {
        name: 'Property',
        description: 'Property related endpoints'
      },
      {
        name: 'User',
        description: 'User related endpoints'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Property: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'House 1',
            },
            address: {
              type: 'string',
              example: '123 Main St',
            },
            type: {
              type: 'string',
              enum: ['HOUSE', 'APARTMENT_COMPLEX'],
              example: 'HOUSE',
            },
            country: {
              type: 'string',
              example: 'USA',
            },
            state: {
              type: 'string',
              example: 'CA',
            },
          }
        },
        Unit: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Room 1',
            },
            type: {
              type: 'string',
              enum: ['ENTIRE_PROPERTY', 'APARTMENT', 'ROOM'],
              example: 'ENTIRE_PROPERTY',
            },
            rentPrice: {
              type: 'number',
              example: 1000,
            },
            rentDuration: {
              type: 'number',
              description: 'How long before rent is due in days',
              example: 365,
            },
            rentCycle: {
              type: 'string',
              enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
              example: 'DAILY',
            },
            availability: {
              type: 'string',
              enum: ['AVAILABLE', 'RENTED'],
              example: 'AVAILABLE',
            },
          }
        }
      }
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsDoc(options);
