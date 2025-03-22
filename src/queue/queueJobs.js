const Queue = require('bull');
const { REDIS_HOST, REDIS_PORT } = require('../config/queueConfig');

const queueOptions = {
    redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
};

// Function to create a queue
const createQueue = (name) => new Queue(name, queueOptions);

// Define Queues
const queues = {
    sendRestPasswordLinkJob: createQueue('send-reset-password'),
    testProcessReportJob: createQueue('test-report'),
};

module.exports = queues;
