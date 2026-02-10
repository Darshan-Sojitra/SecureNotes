const dns = require("dns").promises;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});