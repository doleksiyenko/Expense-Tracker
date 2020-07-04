const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

const app = express();
app.use(express.json());
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// connect to database
connectDB();

// routes
app.use("/auth/user", require("./routes/auth"));
app.use("/api/", require("./routes/transactions"));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on ${PORT}`));
