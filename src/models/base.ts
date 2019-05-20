import uuidv4 from 'uuid/v4';

export abstract class Base {
    public id = uuidv4();

    constructor(data: any) {
        Object.assign(this, data);
    }
}