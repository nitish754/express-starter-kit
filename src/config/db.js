const mongoose = require('mongoose');


const DB_URL = process.env.DB_URL || "";
const JWT_TOKEN = "";

const connectToDB = async () => {
    try {
        if (!DB_URL) {
            console.log("No database URL provided");
            process.exit(1); // Exit the process with failure
        }

        await mongoose.connect(DB_URL);
        console.log(`🗄️  Database connected successfully!`);

    } catch (error) {
        console.error(`❌ Database connection failed:`)
        process.exit(1); // Exit the process with failure
    }
};

// Export the function and variable
module.exports = {
    connectToDB,
    JWT_TOKEN
};
