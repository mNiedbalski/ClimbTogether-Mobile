export class Achievement {
    id: number;
    name: string;
    criteria: string;
    date_acquired: Date;

    constructor(
        id: number, 
        name: string, 
        criteria: string,
        date_acquired: Date
    ){
        this.id = id;
        this.name = name;
        this.criteria = criteria;
        this.date_acquired = date_acquired;
    }
}
