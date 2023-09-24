class Player {
  velocity: number;
  x: number;
  y: number;

  constructor(x = 200, y = 200) {
    this.velocity = 0;
    this.x = x;
    this.y = y;
  }
}
