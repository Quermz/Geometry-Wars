import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
import { Laser } from "./player/laser/laser.js";
import { Shape, Square, Circle } from "./shape/shape.js";
import { Particle } from "./particles/particles.js";
import { spawner } from "./shape/spawner/spawner.js";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 960,
  height: 640,
  background: "000000",
});

const player = new Player();
// const square = new Square(20, 20, 300, 300);
// const circle = new Circle(20, 300, 300);

// app.stage.addChild(square.sprite);
// app.stage.addChild(circle.sprite);
app.stage.addChild(player.sprite);

document.body.appendChild(app.view);

let laserArr: Laser[] = [];

let particlesArray: Particle[] = [];

let shapeArray: Shape[] = [];

app.ticker.add(() => {
  player.move();

  //Player shoots automatically after 50 ticks
  let laser = player.shoot();
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
    shape.move(player.sprite.x, player.sprite.y);
    if (shape.hit && shape.live) {
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
    particlesArray[i].move();
    // if (particlesArray[i].finished) {
    //   app.stage.removeChild(particlesArray[i].container);
    //   particlesArray.splice(parseInt(i));
    // }
  }

  // for (let i in particlesArray) {
  //   if (particlesArray[i].finished) {
  //     console.log("finito");
  //     app.stage.removeChild(particlesArray[i].container);
  //     particlesArray.splice(parseInt(i));
  //   }
  // }

  //Create new shape
  let newShape = spawner(
    30,
    25,
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
