import { GenericDAO } from "../DAOs/generic-dao";
import { Base } from "../models/base";

export abstract class GenericController<Model extends Base> {
    protected dao: GenericDAO<Model>;

    constructor(dao: GenericDAO<Model>) {
        this.dao = dao;
    }

    async create(req: any, res: any) {
        const result = this.dao.create(req.body);

        res.send(result);
    }

    async read(req: any, res: any) {
        const result = this.dao.read(req.params.id);

        res.send(result);
    }

    async update(req: any, res: any) {
        const result = this.dao.update(req.params.id, req.body);

        res.send(result);
    }

    async delete(req: any, res: any) {
        const result = this.dao.delete(req.params.id);

        res.send(result);
    }

    async list(req: any, res: any) {
        const result = this.dao.list();

        res.send(result);
    }
}
