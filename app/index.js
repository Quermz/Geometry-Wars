import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
import { spawner } from "./shape/spawner/spawner.js";
const app = new PIXI.Application({
    width: 960,
    height: 640,
    background: "000000",
});
const player = new Player();
app.stage.addChild(player.sprite);
document.body.appendChild(app.view);
let laserArr = [];
let particlesArray = [];
let shapeArray = [];
app.ticker.add(() => {
    player.move();
    let laser = player.shoot();
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
        shape.move(player.sprite.x, player.sprite.y);
        if (shape.hit && shape.live) {
            particlesArray.push(shape.explode());
            app.stage.removeChild(shape.sprite);
        }
        else {
            newShapeArr.push(shape);
        }
    }
    for (let i in particlesArray) {
        if (!particlesArray[i].added) {
            app.stage.addChild(particlesArray[i].container);
            particlesArray[i].added = true;
        }
        particlesArray[i].move();
    }
    let newShape = spawner(30, 25, newShapeArr.length, player.sprite.x, player.sprite.y);
    if (newShape) {
        newShapeArr.push(newShape);
        app.stage.addChild(newShape.sprite);
    }
    shapeArray = newShapeArr;
});
