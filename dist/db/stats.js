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
const db_1 = require("./db");
const dbstats = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbstats = {
        vn: 0,
        tags: 0,
        releases: 0,
        producers: 0,
        staff: 0,
        characters: 0,
        traits: 0,
    };
    let res;
    res = yield db_1.database.query('SELECT COUNT(id) FROM vn', []);
    dbstats.vn = res.rows[0].count;
    res = yield db_1.database.query('SELECT COUNT(id) FROM tags', []);
    dbstats.tags = res.rows[0].count;
    res = yield db_1.database.query('SELECT COUNT(id) FROM releases', []);
    dbstats.releases = res.rows[0].count;
    res = yield db_1.database.query('SELECT COUNT(id) FROM producers', []);
    dbstats.producers = res.rows[0].count;
    res = yield db_1.database.query('SELECT COUNT(id) FROM staff', []);
    dbstats.staff = res.rows[0].count;
    res = yield db_1.database.query('SELECT COUNT(id) FROM chars', []);
    dbstats.characters = res.rows[0].count;
    res = yield db_1.database.query('SELECT COUNT(id) FROM traits', []);
    dbstats.traits = res.rows[0].count;
    return dbstats;
});
exports.dbstats = dbstats;
