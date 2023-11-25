import {Attempt} from './attempt';
import {Role} from './role';
export class User {
  id: number;
  username: string;
  name: string;
  surname: string;
  sex: string;
  birthday: Date;
  height: number;
  weight: number;
  roles: Role[];
  attempts: Attempt[];

  constructor(
    id: number,
    username: string,
    name: string,
    surname: string,
    sex: string,
    birthday: Date,
    height: number,
    weight: number,
    roles: Role[],
    attempts: Attempt[]
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.sex = sex;
    this.birthday = birthday;
    this.height = height;
    this.weight = weight;
    this.roles = roles;
    this.attempts = attempts;
  }
  countUserAttempts(): number {
    return this.attempts.length;
  }
  countCompletedRoutes(): number {
    let completedRoutes = 0;
    this.attempts.forEach(function (attempt){
      if (attempt.top_reached) {
        completedRoutes++;
      }
    })
    return completedRoutes;
  }
}
