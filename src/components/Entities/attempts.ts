class Attempts {
  id: number;
  attempt_time: Date;
  completion_time: Date;
  zone_reached: boolean;
  top_reached: boolean;

  constructor(id: number, attempt_time: Date, completion_time: Date, zone_reached: boolean, top_reached: boolean) {
    this.id = id;
    this.attempt_time = attempt_time;
    this.completion_time = completion_time;
    this.zone_reached = zone_reached;
    this.top_reached = top_reached;
  }
}
