import { Attempt } from "./attempt";
import { User } from "./user";
export class Route {
  id: number;
  name: string;
  routesetter: User;
  difficulty: string;
  attempts: Attempt[];
  constructor(
    id: number,
    name: string,
    routesetter: User,
    difficulty: string,
    attempts: Attempt[],
  ) {
    this.id = id;
    this.name = name;
    this.routesetter = routesetter;
    this.difficulty = difficulty;
    this.attempts = attempts;
  }
}
