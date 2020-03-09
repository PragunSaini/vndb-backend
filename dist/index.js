"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./utils/config");
var logger_1 = require("./utils/logger");
var app = express_1.default();
// app.get('/', async (req, res) => {
//   const client = await DB.getClient()
//   try {
//     const result = await client.query('Select * from vn where id = $1', [4])
//     client.release()
//     res.json(result)
//   } catch (err) {
//     Console.log(err)
//     res.json({ response: 'ERRED' })
//   }
//   await DB.end()
//   Console.log('ENDED')
// })
app.listen(config_1.PORT, function () {
    logger_1.Console.info("Listening on PORT " + config_1.PORT + " ...");
});
