import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
import { Square, Circle } from "./shape/shape.js";
import { Particle } from "./particles/particles.js";
const texture = await PIXI.Assets.load("./app/resources/player.jpg");
const app = new PIXI.Application({
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
let laserArr = [];
let part = new Particle();
part.create("green", "square");
app.stage.addChild(part.container);
app.ticker.add(() => {
    part.move();
    let laser = player.shoot();
    player.move();
    square.move(player.sprite.x, player.sprite.y);
    circle.move(player.sprite.x, player.sprite.y);
    if (laser) {
        laserArr.push(laser);
        app.stage.addChild(laser.sprite);
    }
    let newArr = [];
    for (let laser of laserArr) {
        laser.collision([circle, square]);
        laser.move();
        if (!laser.bounds()) {
            newArr.push(laser);
        }
        else {
            app.stage.removeChild(laser.sprite);
        }
    }
    laserArr = newArr;
});
