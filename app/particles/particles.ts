import * as PIXI from "PIXI.js";

import { vector } from "../utils/vectors.js";

class Particle {
  sprite: PIXI.Graphics;
  direction: string;
  velocity: number;
  edge: number;
  container: PIXI.Container;
  particleArray: { sprite: PIXI.Graphics; direction: vector }[];
  added: boolean;
  constructor() {
    this.container = new PIXI.Container();
    this.particleArray = [];
    this.added = false;
  }
  create(colour: string, shape: string, x: number, y: number) {
    for (let i = 0; i < 5; i++) {
      let particle = {
        sprite: new PIXI.Graphics(),
        direction: { x: 1 - 2 * Math.random(), y: 1 - 2 * Math.random() },
      };
      particle.sprite.lineStyle(1.5, colour);
      if (shape == "circle") {
        let size = 1 + 5 * Math.random();
        particle.sprite.drawCircle(0, 0, size);
      }
      if (shape == "square") {
        let size = 5 + 5 * Math.random();
        particle.sprite.drawRect(0, 0, size, size);
      }
      particle.sprite.x = x;
      particle.sprite.y = y;
      let blurFilter = new PIXI.BlurFilter(0);
      let alphaFilter = new PIXI.AlphaFilter(1.05);
      particle.sprite.filters = [blurFilter, alphaFilter];
      this.container.addChild(particle.sprite);
      this.particleArray.push(particle);
      console.log(particle.sprite.alpha);
    }
  }
  move() {
    for (let particle of this.particleArray) {
      particle.sprite.x += particle.direction.x / 2;
      particle.sprite.y += particle.direction.y / 2;
      particle.sprite.alpha -= 0.005 + Math.random() / 1000;
    }
  }
}

export { Particle };
