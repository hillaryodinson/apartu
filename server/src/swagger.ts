import swaggerJsDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Apartu API",
			version: "1.0.0",
			description: "Apartu API documentation",
		},
		servers: [
			{
				url: "http://localhost:3000/api",
				description: "Development server",
			},
		],
		tags: [
			{
				name: "Authentication",
				description: "Authentication related endpoints",
			},
			{
				name: "File",
				description: "File and upload related endpoints",
			},
			{
				name: "Property",
				description: "Property related endpoints",
			},
			{
				name: "User",
				description: "User related endpoints",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
			schemas: {
				File: {
					type: "object",
					properties: {
						main: {
							type: "string",
							example: "/uploads/main/1629278998877.jpg",
						},
						thumb: {
							type: "string",
							example: "/uploads/thumb/1629278998877.jpg",
						},
					},
				},
				Property: {
					type: "object",
					properties: {
						name: {
							type: "string",
							example: "House 1",
						},
						address: {
							type: "string",
							example: "123 Main St",
						},
						type: {
							type: "string",
							enum: ["HOUSE", "APARTMENT_COMPLEX"],
							example: "HOUSE",
						},
						country: {
							type: "string",
							example: "USA",
						},
						state: {
							type: "string",
							example: "CA",
						},
					},
				},
				Unit: {
					type: "object",
					properties: {
						name: {
							type: "string",
							example: "Room 1",
						},
						type: {
							type: "string",
							enum: ["ENTIRE_PROPERTY", "APARTMENT", "ROOM"],
							example: "ENTIRE_PROPERTY",
						},
						rentPrice: {
							type: "number",
							example: 1000,
						},
						rentDuration: {
							type: "number",
							description: "How long before rent is due in days",
							example: 365,
						},
						rentCycle: {
							type: "string",
							enum: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
							example: "DAILY",
						},
						availability: {
							type: "string",
							enum: ["AVAILABLE", "RENTED"],
							example: "AVAILABLE",
						},
						images: {
							type: "array",
							items: {
								$ref: "#/components/schemas/File",
							},
						},
					},
				},
				User: {
					type: "object",
					properties: {
						name: {
							type: "string",
							example: "Jane Samuel",
							description: "Full name of the user",
						},
						email: {
							type: "string",
							example: "jane.samuel@gmail.com",
							description: "The email address of the user",
						},
						password: {
							type: "string",
							example: "password",
							description: "The password of the user",
						},
						role: {
							type: "string",
							enum: ["landlord", "caretaker", "admin", "tenant"],
							example: "tenant",
							description: "The role of the user",
						},
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsDoc(options);
