import * as PIXI from "PIXI.js";
import { vectorCalc } from "./utils/vectors.js";
import { Player } from "./player/player.js";
import { Laser } from "./player/laser/laser.js";
import { Square, Circle } from "./shape/shape.js";

const texture = await PIXI.Assets.load("./app/resources/player.jpg");

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 960,
  height: 640,
  background: "000000",
});

const player = new Player();
const shape = new Square(20, 20, 300, 300);
const circle = new Circle(20, 300, 300);

app.stage.addChild(shape.sprite);
app.stage.addChild(player.sprite);
app.stage.addChild(circle.sprite);

document.body.appendChild(app.view);

let laserArr: Laser[] = [];
app.ticker.add((ticker) => {
  let laser = player.shoot();
  player.move();
  shape.move(player.sprite.x, player.sprite.y);
  circle.move(player.sprite.x, player.sprite.y);
  if (laser) {
    laserArr.push(laser);
    app.stage.addChild(laser.sprite);
  }
  let newArr: Laser[] = [];
  for (let l of laserArr) {
    l.move();
    if (!l.bounds()) {
      newArr.push(l);
    } else {
      app.stage.removeChild(l.sprite);
    }
  }
  laserArr = newArr;
});
