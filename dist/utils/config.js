"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load the environment variables
require('dotenv').config();
// Retrieve the env variables
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV;
exports.PORT = PORT;
exports.NODE_ENV = NODE_ENV;
