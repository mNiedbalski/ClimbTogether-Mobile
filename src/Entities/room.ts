import { Route } from "./route";
export class Room {
    id: number;
    name: string;
    routes: Route[];

    constructor(id: number, name: string, routes: Route[]) {
        this.id = id;
        this.name = name;
        this.routes = routes;
    }
}