import uuidv4 from 'uuid/v4';

export abstract class Base {
    public id: string;

    constructor() {
        this.id = uuidv4();
    }
}