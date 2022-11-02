import path from 'path';
import JSONdb from 'simple-json-db';

// create DB instance
const DB = new JSONdb(path.resolve(`./`, `cache/db/storage.json`));

export default DB;
