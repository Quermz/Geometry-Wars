import * as PIXI from "PIXI.js";
import { sound } from "@pixi/sound";
import { Player } from "./player/player.js";
import { Laser } from "./player/laser/laser.js";
import { Shape } from "./shape/shape.js";
import { Particle } from "./particles/particles.js";
import { spawner } from "./shape/spawner/spawner.js";
import { Score } from "./score/score.js";
import { collision } from "./utils/collision.js";
import { Menu } from "./menu/menu.js";

let canvas = document.getElementsByTagName("canvas")[0];
canvas.className = "pixiCanvas";

const app = new PIXI.Application<HTMLCanvasElement>({
  view: canvas,
  width: 960,
  height: 640,
  background: "000000",
});

const player = new Player();

let laserArr: Laser[] = [];

let particlesArray: Particle[] = [];

let shapeArray: Shape[] = [];

const score = new Score();

const menu = new Menu(app, player, laserArr, particlesArray, shapeArray, score);

app.ticker.maxFPS = 60;

app.stage.addChild(player.sprite);

app.stage.addChild(score.text);

app.ticker.add((delta: number) => {
  if (menu.gameLive && !menu.startMenuOpen) {
    player.move(delta);
    score.incremenetScore();

    //Check player collision
    for (let shape of shapeArray) {
      if (collision(player, shape)) {
        menu.gameLive = false;
        particlesArray.push(player.explode());
        app.stage.removeChild(player.sprite);
      }
    }

    //Player shoots automatically after x  ticks
    let laser = player.shoot(delta, score.score);
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
    for (let particle of particlesArray) {
      if (!particle.added) {
        app.stage.addChild(particle.container);
        particle.added = true;
      }
      particle.move(delta);
    }

    //If particles have finished their animations remove from array
    let newParticlesArray = [];
    for (let particle of particlesArray) {
      if (particle.finished) {
        app.stage.removeChild(particle.container);
      } else if (!particle.finished) {
        newParticlesArray.push(particle);
      }
    }

    particlesArray = newParticlesArray;

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
  } else if (!menu.gameLive && !menu.startMenuOpen) {
    //Game Over

    menu.openGameOverMenu(app);

    //Fade music
    menu.musicStop();
    // music.loop = false;
    // if (music.volume > 0) {
    //   music.volume -= 0.001;
    // }

    score.flash();
    for (let shape of shapeArray) {
      app.stage.removeChild(shape.sprite);
      menu.gameLive = false;
      particlesArray.push(shape.explode());
    }
    shapeArray = [];

    for (let laser of laserArr) {
      app.stage.removeChild(laser.sprite);
    }

    laserArr = [];

    for (let particle of particlesArray) {
      if (!particle.added) {
        app.stage.addChild(particle.container);
        particle.added = true;
      }
      particle.move(delta);
    }
    //If particles have finished their animations remove from array
    let newParticlesArray: Particle[] = [];
    for (let particle of particlesArray) {
      if (particle.finished) {
        app.stage.removeChild(particle.container);
      } else if (!particle.finished) {
        newParticlesArray.push(particle);
      }
    }
    particlesArray = newParticlesArray;
  }
});
