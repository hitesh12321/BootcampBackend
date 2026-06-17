require("dotenv/config");
// console.log(process.env.PORT or something ); to access environment variables

const app = require("./app");
const PORT = process.env.PORT || 3000;

const connectDB = require("./db/database.connection");

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
