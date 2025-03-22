const { connectToDB } = require("../config/db");
const { seedPermissionInDB } = require("./permissionSeeder");
const { seedRole } = require("./roleSeeder");
const { userSeeder } = require("./userSeeder");

const runSeeder = async () => {
    try {
        // connect to db before running the seeder
        await connectToDB();
        // import all the seeders to run here 
        await seedPermissionInDB();
        await seedRole();
        await userSeeder();

        // exit process if all seeders run successfully
        process.exit(1);
    } catch (err) {
        console.error(err);
    }

}

runSeeder();