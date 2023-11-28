import { Room } from './room';
export class Gym {
    id: number;
    address: string;
    name: string;
    rooms: Room[];

    constructor(id: number, address: string, name: string, rooms: Room[]) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.rooms = rooms;
    }
}
