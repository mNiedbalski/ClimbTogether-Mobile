import { Attempt } from "./attempt";
import { User } from "./user";
export class Route {
  id: number;
  route_name: string;
  routesetter: User;
  difficulty: string;
  attempts: Attempt[];
  constructor(
    id: number,
    route_name: string,
    routesetter: User,
    difficulty: string,
    attempts: Attempt[],
  ) {
    this.id = id;
    this.route_name = route_name;
    this.routesetter = routesetter;
    this.difficulty = difficulty;
    this.attempts = attempts;
  }
}
