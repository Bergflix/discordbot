import * as PouchDB from "pouchdb";
import * as PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

class DB {
    private static _instance: DB;
    private readonly _db: any;

    constructor() {
        this._db = new PouchDB("https://couchdb.bergflix.de/bot");
    }

    public static init(){
        this._instance = new this();
    }
    public static get Instance(){
        return this._instance;
    }
    public static get Connection(){
        return this._instance.DB;
    }

    public get DB(){
        return this._db;
    }
}

export default DB;