import * as PouchDB from "pouchdb";
import * as PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

class DB {
    private readonly _db: any;

    constructor() {
        this._db = new PouchDB("https://couchdb.bergflix.de/bot");
    }

    public get Connection(){
        return this._db;
    }
}

export default new DB();