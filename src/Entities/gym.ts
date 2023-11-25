export class Gym {
    id: number;
    address: string;
    name: string;
    routes: string[];

    constructor(id: number, address: string, name: string, routes: string[]) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.routes = routes;
    }
}
