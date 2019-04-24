export class GenericDAO {
    protected database: any;

    constructor(database: any) {
        this.database = database;
    }

    create() {
        // TODO:
    }

    read() {
        // FIXME:
        this.database.get('posts')
        .push({ id: 1, title: 'lowdb is awesome'})
        .write();
    }

    update() {
        // FIXME:
        this.database.update('count', (n: any) => n + 1)
        .write();
    }

    delete() {
        // TODO:
    }
}