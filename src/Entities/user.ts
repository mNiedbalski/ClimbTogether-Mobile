import {Attempt} from './attempt';
import {Role} from './role';
import {Achievement} from './achievement';
export class User {
  id: number;
  name: string;
  surname: string;
  sex: string;
  birthday: Date;
  height: number;
  weight: number;
  roles: Role[];
  attempts: Attempt[];
  experience_points: number;
  level: number;
  achievements: Achievement[];

  constructor(
    id: number,
    name: string,
    surname: string,
    sex: string,
    birthday: Date,
    height: number,
    weight: number,
    roles: Role[],
    attempts: Attempt[],
    experience_points: number,
    level: number,
    achievements: Achievement[]
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.sex = sex;
    this.birthday = birthday;
    this.height = height;
    this.weight = weight;
    this.roles = roles;
    this.attempts = attempts;
    this.experience_points = experience_points;
    this.level = level;
    this.achievements = achievements;
  }
}
