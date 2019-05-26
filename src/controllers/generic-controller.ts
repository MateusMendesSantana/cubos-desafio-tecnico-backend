import { GenericDAO } from "../DAOs/generic-dao";
import { Base } from "../models/base";
import { validationResult } from "express-validator/check";

export abstract class GenericController<Model extends Base> {

    constructor(
        protected dao: GenericDAO<Model>
    ) {
    }

    async create(req: any, res: any, _next: any) {
        const errors = validationResult(req).formatWith(this.validationHandler);

        if (errors.isEmpty()) {
            const instance = this.dao.createInstance(req.body);
            const result = this.dao.create(instance);

            res.send(result);
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    validationHandler({ msg, param }: any) {
        return `${param} ${msg}`;
    }

    async read(req: any, res: any, _next: any) {
        const result = this.dao.read(req.params.id);

        if(result) {
            res.send(result);
        } else {
            res.status(500).send();
        }
    }

    async update(req: any, res: any, _next: any) {
        const data = this.dao.createInstance(req.body);
        const result = this.dao.update(req.params.id, data);

        res.send(result);
    }

    async delete(req: any, res: any, _next: any) {
        const result = this.dao.delete(req.params.id);

        res.send(result);
    }

    async list(_req: any, res: any, _next: any) {
        const result = this.dao.list();

        res.send(result);
    }

    protected abstract generateConstrains(instance: Base): any;
}