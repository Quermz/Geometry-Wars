import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
import { Laser } from "./player/laser/laser.js";
import { Shape, Square, Circle } from "./shape/shape.js";
import { Particle } from "./particles/particles.js";
import { spawner } from "./shape/spawner/spawner.js";
import { Score } from "./score/score.js";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 960,
  height: 640,
  background: "000000",
});

const player = new Player();

app.stage.addChild(player.sprite);

document.body.appendChild(app.view);

let laserArr: Laser[] = [];

let particlesArray: Particle[] = [];

let shapeArray: Shape[] = [];

let score = new Score();

app.ticker.maxFPS = 60;
app.stage.addChild(score.text);

app.ticker.add((delta) => {
  player.move(delta);
  score.incremenetScore();
  //Player shoots automatically after x  ticks
  let laser = player.shoot(delta);
  if (laser) {
    laserArr.push(laser);
    app.stage.addChild(laser.sprite);
  }

  //New array created with all lasers still in range
  let newLaserArr: Laser[] = [];

  for (let laser of laserArr) {
    laser.move();
    if (!laser.collision(shapeArray) && !laser.bounds()) {
      newLaserArr.push(laser);
    } else {
      app.stage.removeChild(laser.sprite);
    }
  }

  laserArr = newLaserArr;

  let newShapeArr: Shape[] = [];

  //If shape is hit and is live, particles are added to stage and shape is removed
  for (let shape of shapeArray) {
    shape.move(delta, player.sprite.x, player.sprite.y);
    if (shape.hit && shape.live) {
      score.shapeHit(shape.shape);
      particlesArray.push(shape.explode());
      app.stage.removeChild(shape.sprite);
    } else {
      newShapeArr.push(shape);
    }
  }

  //If particlesArray haven't already been added to stage, add particle container to stage
  for (let i in particlesArray) {
    if (!particlesArray[i].added) {
      app.stage.addChild(particlesArray[i].container);
      particlesArray[i].added = true;
    }
    particlesArray[i].move(delta);
  }

  //If particles have finished their animations remove from array
  for (let i in particlesArray) {
    if (particlesArray[i].finished) {
      console.log("finito");
      app.stage.removeChild(particlesArray[i].container);
      particlesArray.splice(parseInt(i));
    }
  }

  //Create new shape
  let newShape = spawner(
    delta,
    score.score,
    newShapeArr.length,
    player.sprite.x,
    player.sprite.y
  );
  if (newShape) {
    newShapeArr.push(newShape);
    app.stage.addChild(newShape.sprite);
  }

  shapeArray = newShapeArr;
});
