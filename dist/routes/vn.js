"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_1 = require("../db/stats");
const vn_1 = require("../db/vn");
const vnRouter = express_1.Router();
exports.vnRouter = vnRouter;
vnRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield stats_1.dbstats());
}));
vnRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vnid = parseInt(req.params.id, 10);
        res.json(yield vn_1.getvn(vnid));
    }
    catch (err) {
        next(err);
    }
}));
