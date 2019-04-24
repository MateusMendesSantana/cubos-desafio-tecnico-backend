import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('lowdb.json')
const lowdb = low(adapter);

export { lowdb };
