import uuidv4 from 'uuid/v4';

export class Base {
    protected id: string;

    constructor() {
        this.id = uuidv4();
    }
}