import { Route } from "./route";
import { User } from "./user";
export class Routesetter {
  id: number;
  user: User;
  routes: Route[];

  constructor(id: number, user: User, routes: Route[]) {
    this.id = id;
    this.user = user;
    this.routes= routes;
  }
}
