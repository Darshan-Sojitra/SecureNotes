const dns = require("dns").promises;
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

/* -------------------- CORS FIX -------------------- */
const allowedOrigins = [
    "https://secure-notes-u3ul.vercel.app"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});
/* ------------------------------------------------- */

connectDB();

app.get("/", (req, res) => {
    res.send("SecureNotes backend running");
});

module.exports = app;
