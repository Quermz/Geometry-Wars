import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
import { spawner } from "./shape/spawner/spawner.js";
import { Score } from "./score/score.js";
import { collision } from "./utils/collision.js";
import { Menu } from "./menu/menu.js";
let canvas = document.getElementsByTagName("canvas")[0];
canvas.className = "pixiCanvas";
const app = new PIXI.Application({
    view: canvas,
    width: 960,
    height: 640,
    background: "000000",
});
const player = new Player();
let laserArr = [];
let particlesArray = [];
let shapeArray = [];
const score = new Score();
const menu = new Menu(app, player, laserArr, particlesArray, shapeArray, score);
app.ticker.maxFPS = 60;
app.stage.addChild(player.sprite);
app.stage.addChild(score.text);
app.ticker.add((delta) => {
    if (menu.gameLive && !menu.startMenuOpen) {
        player.move(delta);
        score.incremenetScore();
        for (let shape of shapeArray) {
            if (collision(player, shape)) {
                menu.gameLive = false;
                particlesArray.push(player.explode());
                app.stage.removeChild(player.sprite);
            }
        }
        let laser = player.shoot(delta, score.score);
        if (laser) {
            laserArr.push(laser);
            app.stage.addChild(laser.sprite);
        }
        let newLaserArr = [];
        for (let laser of laserArr) {
            laser.move();
            if (!laser.collision(shapeArray) && !laser.bounds()) {
                newLaserArr.push(laser);
            }
            else {
                app.stage.removeChild(laser.sprite);
            }
        }
        laserArr = newLaserArr;
        let newShapeArr = [];
        for (let shape of shapeArray) {
            shape.move(delta, player.sprite.x, player.sprite.y);
            if (shape.hit && shape.live) {
                score.shapeHit(shape.shape);
                particlesArray.push(shape.explode());
                app.stage.removeChild(shape.sprite);
            }
            else {
                newShapeArr.push(shape);
            }
        }
        for (let particle of particlesArray) {
            if (!particle.added) {
                app.stage.addChild(particle.container);
                particle.added = true;
            }
            particle.move(delta);
        }
        let newParticlesArray = [];
        for (let particle of particlesArray) {
            if (particle.finished) {
                app.stage.removeChild(particle.container);
            }
            else if (!particle.finished) {
                newParticlesArray.push(particle);
            }
        }
        particlesArray = newParticlesArray;
        let newShape = spawner(delta, score.score, newShapeArr.length, player.sprite.x, player.sprite.y);
        if (newShape) {
            newShapeArr.push(newShape);
            app.stage.addChild(newShape.sprite);
        }
        shapeArray = newShapeArr;
    }
    else if (!menu.gameLive && !menu.startMenuOpen) {
        menu.openGameOverMenu(app);
        menu.musicStop();
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
        let newParticlesArray = [];
        for (let particle of particlesArray) {
            if (particle.finished) {
                app.stage.removeChild(particle.container);
            }
            else if (!particle.finished) {
                newParticlesArray.push(particle);
            }
        }
        particlesArray = newParticlesArray;
    }
});
