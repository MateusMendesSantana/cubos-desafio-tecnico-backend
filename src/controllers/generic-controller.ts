import { GenericDAO } from "../DAOs/generic-dao";
import { Base } from "../models/base";

export abstract class GenericController<Model extends Base> {

    constructor(
        protected dao: GenericDAO<Model>
    ) {
    }

    async create(req: any, res: any) {
        const data = this.createInstance(req.body);

        try {
            data.validate();
            const result = this.dao.create(data);
    
            res.send(result);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    async read(req: any, res: any) {
        const result = this.dao.read(req.params.id);

        if(result) {
            res.send(result);
        } else {
            res.status(500).send();
        }
    }

    async update(req: any, res: any) {
        const result = this.dao.update(req.params.id, req.body);

        res.send(result);
    }

    async delete(req: any, res: any) {
        const result = this.dao.delete(req.params.id);

        res.send(result);
    }

    async list(_req: any, res: any) {
        const result = this.dao.list();

        res.send(result);
    }

    protected abstract createInstance(data: any): Model;
}
