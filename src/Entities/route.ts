import { Attempt } from "./attempt";
import { Routesetter } from "./routesetter";
export class Route {
  id: number;
  route_name: string;
  routesetter: Routesetter;
  difficulty: string;
  attempts: Attempt[];
  best_attempt: Attempt;
  constructor(
    id: number,
    route_name: string,
    routesetter: Routesetter,
    difficulty: string,
    attempts: Attempt[],
    best_attempt: Attempt,
  ) {
    this.id = id;
    this.route_name = route_name;
    this.routesetter = routesetter;
    this.difficulty = difficulty;
    this.attempts = attempts;
    this.best_attempt = best_attempt;
  }
}
