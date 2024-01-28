import * as PIXI from "PIXI.js";
import { Shape } from "../../shape/shape.js";
import { collision } from "../../utils/collision.js";

class Laser {
  sprite: PIXI.Graphics;
  direction: string;
  velocity: number;
  edge: number;
  constructor(x: number, y: number, direction: string, velocity: number) {
    this.sprite = new PIXI.Graphics();
    this.sprite.lineStyle(1.5, "0xFF0000");
    this.sprite.drawCircle(0, 0, 3);
    this.sprite.x = x;
    this.sprite.y = y;
    this.edge = 5;
    this.direction = direction;
    this.velocity = velocity;
  }
  move() {
    switch (this.direction) {
      case "up":
        this.sprite.y -= this.velocity;
        break;
      case "down":
        this.sprite.y += this.velocity;
        break;
      case "left":
        this.sprite.x -= this.velocity;
        break;
      case "right":
        this.sprite.x += this.velocity;
        break;
    }
  }
  bounds(xLimit = 960, yLimit = 640) {
    if (this.sprite.x < -xLimit) {
      return true;
    } else if (this.sprite.x > xLimit * 2) {
      return true;
    }
    if (this.sprite.y < -yLimit) {
      return true;
    } else if (this.sprite.y > yLimit * 2) {
      return true;
    }
    return false;
  }
  collision(shapes: Shape[]) {
    for (let shape of shapes) {
      if (collision(this, shape)) {
        shape.hit = true;
        console.log("hit");
      }
    }
  }
}

export { Laser };
