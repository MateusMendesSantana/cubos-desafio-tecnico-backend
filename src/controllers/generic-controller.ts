import { GenericDAO } from "../DAOs/generic-dao";

export class GenericController {
    protected dao: GenericDAO;

    constructor(dao: GenericDAO) {
        this.dao = dao;
    }
}
