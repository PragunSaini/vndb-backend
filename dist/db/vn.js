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
function getWikidata(wikiId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT * FROM wikidata WHERE id = $1', [wikiId]);
        return res.rows[0];
    });
}
function getStaff(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT vst.aid, st.id, vst.role, vst.note, sta.name, sta.original\
    FROM vn_staff vst JOIN staff st USING(aid) JOIN staff_alias sta USING(aid)\
    WHERE vst.id = $1', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getProducers(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT DISTINCT rprod.pid, prod.name, rlang.lang\
    FROM releases_vn rvn JOIN releases_producers rprod ON rvn.id = rprod.id\
    JOIN releases_lang rlang ON rlang.id = rvn.id\
    JOIN producers prod ON rprod.pid = prod.id\
    WHERE rvn.vid = $1 AND rprod.publisher', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getDevelopers(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT DISTINCT rprod.pid, prod.name\
    FROM releases_vn rvn JOIN releases_producers rprod ON rvn.id = rprod.id\
    JOIN releases_lang rlang ON rlang.id = rvn.id\
    JOIN producers prod ON rprod.pid = prod.id\
    WHERE rvn.vid = $1 AND rprod.developer', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getRelations(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT vn1.id AS "vid", vnr.relation, vnr.official, vn2.id, vn2.title\
    FROM vn vn1 JOIN vn_relations vnr ON vn1.id = vnr.vid JOIN vn vn2 ON vnr.id = vn2.id\
    WHERE vn1.id = $1', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getReleases(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT r.*, rlan.*, rprod.*, rplat.*, rmed.* FROM \
    releases r INNER JOIN releases_vn rvn ON r.id = rvn.id \
    INNER JOIN releases_media rmed ON r.id = rmed.id \
    INNER JOIN releases_platforms rplat ON r.id = rplat.id \
    INNER JOIN releases_producers rprod ON r.id = rprod.id \
    INNER JOIN releases_lang rlan ON r.id = rlan.id \
    WHERE rvn.vid = $1', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getScreenshots(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT * FROM vn_screenshots vs \
    INNER JOIN screenshots s ON vs.scr = s.id \
    WHERE vs.id = $1', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getTags(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT t.id, t.name, tv.vid, tv.ignore, COUNT(tv.uid) AS "votes", \
            ROUND(AVG(tv.spoiler), 2) AS "spoiler", ROUND(AVG(vote), 1) AS "rating" \
    FROM tags t INNER JOIN tags_vn tv ON t.id = tv.tag \
    WHERE tv.vid = $1 \
    GROUP BY tv.vid, t.id, tv.ignore', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getChars(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('SELECT c.*, cv.*, sta.id AS "sei_id", sta.aid AS "sei_aid", \
            sta.name AS "sei_name", vs.note, \
            rel.title AS "rel_title" \
    FROM chars_vns cv \
    INNER JOIN chars c USING(id) \
    INNER JOIN vn_seiyuu vs ON vs.cid = c.id AND vs.id = cv.vid \
    INNER JOIN staff_alias sta ON vs.aid = sta.aid \
    LEFT JOIN releases rel ON cv.rid = rel.id \
    WHERE cv.vid = $1', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
function getAnime(vnid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.database.query('Select * FROM anime JOIN vn_anime ON anime.id = vn_anime.aid WHERE vn_anime.id = $1', [vnid]);
        return res.rows.length > 0 ? res.rows : null;
    });
}
const getvn = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vnresult = {};
    // Get the VN from the database if present
    const res = yield db_1.database.query('SELECT * FROM vn WHERE id = $1', [id]);
    if (res.rows.length == 0) {
        throw new errors_1.DatabaseError('VNNOTFOUND', `VN with id ${id} does not exist`);
    }
    vnresult.vn = res.rows[0];
    const promises = [];
    // If wikidata present, fetch it
    if (vnresult.vn.l_wikidata) {
        promises.push(getWikidata(parseInt((_a = vnresult.vn) === null || _a === void 0 ? void 0 : _a.l_wikidata, 10)));
    }
    else {
        vnresult.wikidata = null;
    }
    // Get the staff details for this vn
    promises.push(getStaff(id));
    // Get the relations to other vn
    promises.push(getRelations(id));
    // Get the related anime
    promises.push(getAnime(id));
    // Get the producers list by language
    promises.push(getProducers(id));
    // Get the developers list
    promises.push(getDevelopers(id));
    // Get the releases
    promises.push(getReleases(id));
    // Get screenshot ids
    promises.push(getScreenshots(id));
    // Get the tags
    promises.push(getTags(id));
    // Get the characters
    promises.push(getChars(id));
    if (vnresult.vn.l_wikidata) {
        ;
        [
            vnresult.wikidata,
            vnresult.staff,
            vnresult.relations,
            vnresult.anime,
            vnresult.producers,
            vnresult.developers,
            vnresult.releases,
            vnresult.screenshots,
            vnresult.tags,
            vnresult.chars,
        ] = yield Promise.all(promises);
    }
    else {
        ;
        [
            vnresult.staff,
            vnresult.relations,
            vnresult.anime,
            vnresult.producers,
            vnresult.developers,
            vnresult.releases,
            vnresult.screenshots,
            vnresult.tags,
            vnresult.chars,
        ] = yield Promise.all(promises);
    }
    return vnresult;
});
exports.getvn = getvn;
// TODO
// characters
