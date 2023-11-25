class User {
  id: number;
  username: string;
  name: string;
  surname: string;
  sex: string;
  birthday: Date;
  height: number;
  weight: number;
  role_id: number;
  attempts_id: number;

  constructor(
    id: number,
    username: string,
    name: string,
    surname: string,
    sex: string,
    birthday: Date,
    height: number,
    weight: number,
    role_id: number,
    attempts_id: number
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.sex = sex;
    this.birthday = birthday;
    this.height = height;
    this.weight = weight;
    this.role_id = role_id;
    this.attempts_id = attempts_id;
  }

  
}
