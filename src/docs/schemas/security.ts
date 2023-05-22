export const schemaSecurity = {
    securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
        }
    }
};