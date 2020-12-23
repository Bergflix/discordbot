import * as PouchDB from "pouchdb";
import * as PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

class DB {
    private readonly _db: any;

    constructor() {
        this._db = new PouchDB(process.env.DB_PATH, {
            auth: {
                username: process.env.DB_USER,
                password: process.env.DB_PASS
            }
        });
    }

    public get Connection(){
        return this._db;
    }
}

export default new DB();
