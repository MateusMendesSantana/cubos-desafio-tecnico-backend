import { Base } from "../models/base";

export abstract class GenericDAO<Model extends Base>{

    constructor(
        protected model: new (data: any) => Model,
        protected modelName: string,
        protected datasource: any
    ) {
        const defaults: any = {};
        defaults[this.modelName] = [];

        this.datasource.defaults(defaults).write();
    }

    create(data: Model) {
        this.datasource.get(this.modelName).push(data).write();

        return data;
    }

    read(id: string): Model {
        return this.datasource.get(this.modelName).find({id}).value();
    }

    update(id: string, data: Model) {
        return this.datasource.get(this.modelName).find({id}).assign((_n: Model) => data).write();
    }

    delete(id: string) {
        const result = this.datasource.get(this.modelName).remove({id}).write();

        if(result.length > 0) {
            return result[0];
        } else {
            return [];
        }
    }

    list(query: any | ((instance: any) => {}) = {}): Model[] {
        const result: any[] = this.datasource.get(this.modelName).filter(query).value();

        return result.map(data => new this.model(data));
    }
}