
class Role {
  id: number;
  role_name: string;

  constructor(id: number, role_name: string) {
    this.id = id;
    this.role_name = role_name;
  }
}

const userRole = new Role(1, "user");
const adminRole = new Role(2, "admin");
const routeSetterRole = new Role(3, "routesetter");
