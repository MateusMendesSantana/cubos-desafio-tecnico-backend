import { Base } from "../models/base";

export abstract class GenericDAO<Model extends Base>{
    protected database: any;
    protected modelName: string;

    constructor(modelName: string, database: any) {
        this.database = database;
        this.modelName = modelName;

        const defaults: any = {};
        defaults[this.modelName] = [];

        this.database.defaults(defaults).write();
    }

    create(data: Model) {
        return this.database.get(this.modelName).push(data).write();
    }

    read(id: string) {
        return this.database.get(this.modelName).find({id}).value()
    }

    update(id: string, data: Model) {
        return this.database.get(this.modelName).find({id}).update((n: Model) => data).write();
    }

    delete(id: string) {
        return this.database.get(this.modelName).remove({id}).write();
    }
}