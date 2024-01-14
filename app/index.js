import * as PIXI from "PIXI.js";
import { Player } from "./player/player.js";
const texture = await PIXI.Assets.load("./app/resources/player.jpg");
const app = new PIXI.Application({
    width: 960,
    height: 640,
    background: "000000",
});
const player = new Player();
app.stage.addChild(player.sprite);
document.body.appendChild(app.view);
app.ticker.add(() => {
    player.move();
});
