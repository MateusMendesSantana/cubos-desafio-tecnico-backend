import { Base } from "../models/base";
import { Schedule } from "../models/schedule";

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
        this.database.get(this.modelName).push(data).write();

        return data;
    }

    read(id: string): Model {
        return this.database.get(this.modelName).find({id}).value();
    }

    update(id: string, data: Model) {
        return this.database.get(this.modelName).find({id}).assign((_n: Model) => data).write();
    }

    delete(id: string) {
        const result = this.database.get(this.modelName).remove({id}).write();

        if(result.length > 0) {
            return result[0];
        } else {
            return [];
        }
    }

    list(query: any | ((instance: any) => {})): Model[] {
        return this.database.get(this.modelName).filter(query).value();
    }
}