import path from 'path';
import JSONdb from 'simple-json-db';

// from .nuxt/prerender direc
const DB = new JSONdb(path.resolve(`./`, `cache/db/storage.json`));

export default DB;
