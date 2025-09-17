require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/index'); // Adjust the path if necessary
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// server.js or worker.js
require('./queue/workers/index'); // Start the email worker
// const errorHandler = require('./middleware/errorHandler');


const { connectToDB } = require('./config/db'); // Adjust the path if necessary
const responseHelper = require('./utils/responseHelper');


const app = express();
const PORT = process.env.PORT || 3000;

// comment 1

// Initiate connection to the database
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HRMS AI BACKEND APIs",
            version: "1.0.0",
            description: "API documentation using Swagger for modular structure",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
                description: "Development server",
            },
        ],
    },
    apis: ["./src/Modules/**/*.js"], // Ensure the correct path // Scan all module routes
};

// Initialize Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize routes
app.use("/api", router);

// Sample Route
app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the Express server!' });
});

// app.use(errorHandler)

// attach response helper function into local res
app.use((req,res,next)=>{
    res.locals.success = responseHelper.success
    res.locals.error = responseHelper.error
    res.locals.paginated = responseHelper.paginated

    next();
})

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📑 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});