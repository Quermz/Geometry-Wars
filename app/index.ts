import * as Pixi from "pixi.js";

const texture = await Pixi.Assets.load("../resources/player.jpg");

const app = new Pixi.Application<HTMLCanvasElement>({
    width: 600,
    height: 600,
    background: "000000",
});

const player = new Pixi.Sprite(texture);

player.width = 100;
player.height = 100;
let velocity = 0;

window.addEventListener("keydown", ({ key }) => {
    if (key == "w") {
        velocity;
    }
});

app.stage.addChild(player);

document.body.appendChild(app.view);

app.ticker.add((delta) => {
    //console.log(delta);
});

console.log("test")