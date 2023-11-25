class Route {
  id: number;
  route_name: string;
  routesetter_id: number;
  difficulty: string;
  completed: boolean;
  attempts_id: number;
  best_attempt_time: number;

  constructor(
    id: number,
    route_name: string,
    routesetter_id: number,
    difficulty: string,
    completed: boolean,
    attempts_id: number,
    best_attempt_time: number
  ) {
    this.id = id;
    this.route_name = route_name;
    this.routesetter_id = routesetter_id;
    this.difficulty = difficulty;
    this.completed = completed;
    this.attempts_id = attempts_id;
    this.best_attempt_time = best_attempt_time;
  }
}
