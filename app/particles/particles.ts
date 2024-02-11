import * as PIXI from "PIXI.js";

import { vector } from "../utils/vectors.js";

class Particle {
  finished = false;
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
    this.finished = false;
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
      if (shape == "triangle") {
        let size = 5 + 5 * Math.random();
        const path = [
          0,
          size,
          size / 2,
          size - (size * Math.sqrt(3)) / 2,
          size,
          size,
        ];
        particle.sprite.drawPolygon(path);
        particle.sprite.rotation = Math.PI * 2 * Math.random();
      }
      particle.sprite.x = x;
      particle.sprite.y = y;
      let blurFilter = new PIXI.BlurFilter(0);
      let alphaFilter = new PIXI.AlphaFilter(1.05);
      particle.sprite.filters = [blurFilter, alphaFilter];
      this.container.addChild(particle.sprite);
      this.particleArray.push(particle);
    }
  }
  move(delta: number) {
    for (let particle of this.particleArray) {
      particle.sprite.x += (particle.direction.x / 2) * delta;
      particle.sprite.y += (particle.direction.y / 2) * delta;
      particle.sprite.alpha -= 0.01 + (Math.random() / 1000) * delta;
      if (particle.sprite.alpha == 0) {
        this.finished = true;
      }
    }
  }
}

export { Particle };
