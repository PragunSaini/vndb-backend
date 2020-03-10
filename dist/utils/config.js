"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load the environment variables
require('dotenv').config();
// Retrieve the env variables
const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
};
exports.config = config;
console.log(config.NODE_ENV);
