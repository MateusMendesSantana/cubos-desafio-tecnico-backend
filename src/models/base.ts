import uuidv4 from 'uuid/v4';
import { IsUUID } from 'class-validator';

export abstract class Base {
    @IsUUID('4')
    public id = uuidv4();

    constructor(data: any) {
        Object.assign(this, data);
    }
}