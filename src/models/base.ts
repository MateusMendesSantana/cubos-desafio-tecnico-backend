import uuidv4 from 'uuid/v4';

export abstract class Base {
    public id: string;

    constructor(data: any) {
        this.id = uuidv4();

        Object.assign(this, data);
    }
}