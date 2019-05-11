import { GenericDAO } from "../DAOs/generic-dao";
import { Base } from "../models/base";
import { validate, ValidationError } from "class-validator";

export abstract class GenericController<Model extends Base> {

    constructor(
        protected dao: GenericDAO<Model>
    ) {
    }

    async create(req: any, res: any) {
        const instance = this.createInstance(req.body);

        validate(instance).then(errors => {
            if(errors.length > 0) {
                res.status(400).send({
                    message: 'invalid instance',
                    erros: errors.map(this.mapError)
                });
            } else {
                const result = this.dao.create(instance);
    
                res.send(result);
            }
        }).catch(error => {
            res.status(400).send({message: error.message});
        });
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
        const data = this.createInstance(req.body);
        const result = this.dao.update(req.params.id, data);

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

    private mapError = ({property, value, constraints, children}: ValidationError): ValidationError => {
        return {
            property,
            value,
            constraints,
            children: children.map(this.mapError)
        };
    }

    protected abstract createInstance(data: any): Model;
    protected abstract validate(instance: Base): any;
}