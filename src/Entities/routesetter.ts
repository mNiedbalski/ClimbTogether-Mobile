export class Routesetter {
  id: number;
  user_id: number;
  routes_id: number;

  constructor(id: number, user_id: number, routes_id: number) {
    this.id = id;
    this.user_id = user_id;
    this.routes_id = routes_id;
  }
}
