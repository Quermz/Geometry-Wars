import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
import { Laser } from "./player/laser/laser.js";
import { Square, Circle } from "./shape/shape.js";
import { Particle } from "./particles/particles.js";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 960,
  height: 640,
  background: "000000",
});

const player = new Player();
const square = new Square(20, 20, 300, 300);
const circle = new Circle(20, 300, 300);

app.stage.addChild(square.sprite);
app.stage.addChild(circle.sprite);
app.stage.addChild(player.sprite);

document.body.appendChild(app.view);

app.stage.onmousemove = (e) => {
  console.log(e);
  console.log("first");
};
let laserArr: Laser[] = [];

let particles: Particle[] = [];

app.ticker.add(() => {
  player.move();
  square.move(player.sprite.x, player.sprite.y);
  circle.move(player.sprite.x, player.sprite.y);

  let laser = player.shoot();

  if (laser) {
    laserArr.push(laser);
    app.stage.addChild(laser.sprite);
  }

  let newLaserArr: Laser[] = [];

  for (let laser of laserArr) {
    laser.collision([circle, square]);
    laser.move();
    if (!laser.bounds()) {
      newLaserArr.push(laser);
    } else {
      app.stage.removeChild(laser.sprite);
    }
  }
  for (let shape of [circle, square]) {
    if (shape.hit && shape.live) {
      particles.push(shape.explode());
      app.stage.removeChild(shape.sprite);
    }
  }
  console.log(particles);
  for (let particle of particles) {
    if (!particle.added) {
      app.stage.addChild(particle.container);
      particle.added = true;
    }
    particle.move();
  }
  laserArr = newLaserArr;
});
