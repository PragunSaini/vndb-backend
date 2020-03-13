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
const errors_1 = require("../utils/errors");
const getvn = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const client = yield db_1.database.getClient();
    const res = {};
    let temp;
    temp = yield client.query('SELECT * FROM vn WHERE id = $1', [id]);
    if (temp.rows.length == 0) {
        client.release();
        throw new errors_1.DatabaseError('VNNOTFOUND', `VN with id ${id} does not exist`);
    }
    res.vn = temp.rows[0];
    temp = yield client.query('SELECT * FROM wikidata WHERE id = $1', [parseInt((_a = res.vn) === null || _a === void 0 ? void 0 : _a.l_wikidata, 10)]);
    res.wikidata = temp.rows[0];
    temp = yield client.query('SELECT vst.aid, vst.role, sta.name, sta.original, vst.note, st.* FROM \
    vn_staff vst JOIN staff st USING(aid) JOIN staff_alias sta USING(aid) WHERE vst.id = $1;', [id]);
    res.staff = temp.rows;
    client.release();
    return res;
});
exports.getvn = getvn;
