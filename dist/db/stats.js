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
/**
 * Get the statistics related to the VNDB database
 */
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
    const result = yield Promise.all([
        db_1.database.query('SELECT COUNT(id) FROM vn', []),
        db_1.database.query('SELECT COUNT(id) FROM tags', []),
        db_1.database.query('SELECT COUNT(id) FROM releases', []),
        db_1.database.query('SELECT COUNT(id) FROM producers', []),
        db_1.database.query('SELECT COUNT(id) FROM staff', []),
        db_1.database.query('SELECT COUNT(id) FROM chars', []),
        db_1.database.query('SELECT COUNT(id) FROM traits', []),
    ]);
    dbstats.vn = result[0].rows[0].count;
    dbstats.tags = result[0].rows[0].count;
    dbstats.releases = result[0].rows[0].count;
    dbstats.producers = result[0].rows[0].count;
    dbstats.staff = result[0].rows[0].count;
    dbstats.characters = result[0].rows[0].count;
    dbstats.traits = result[0].rows[0].count;
    return dbstats;
});
exports.dbstats = dbstats;
