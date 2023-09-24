import * as Pixi from "pixi.js";
import { vectorCalc } from "./utils/vectors.js";
console.log(vectorCalc);
const texture = await Pixi.Assets.load("../resources/player.jpg");
const app = new Pixi.Application({
    width: 600,
    height: 600,
    background: "000000",
});
const player = new Pixi.Sprite(texture);
const seeker = new Pixi.Sprite(texture);
seeker.height = 50;
seeker.width = 50;
player.width = 100;
player.height = 100;
let velocity = 0;
let keysPressed = { w: false, a: false, s: false, d: false };
window.addEventListener("keypress", ({ key }) => {
    if (key == "d") {
        keysPressed.d = true;
    }
    if (key == "a") {
        keysPressed.a = true;
    }
    if (key == "w") {
        keysPressed.w = true;
    }
    if (key == "s") {
        keysPressed.s = true;
    }
});
window.addEventListener("keyup", ({ key }) => {
    if (key == "d") {
        keysPressed.d = false;
    }
    if (key == "a") {
        keysPressed.a = false;
    }
    if (key == "w") {
        keysPressed.w = false;
    }
    if (key == "s") {
        keysPressed.s = false;
    }
});
app.stage.addChild(player);
app.stage.addChild(seeker);
document.body.appendChild(app.view);
let targetX = 0;
let targetY = 0;
let current = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
app.ticker.add((delta) => {
    targetX = 0;
    targetY = 0;
    if (keysPressed.d && !keysPressed.a) {
        targetX = 1;
    }
    if (keysPressed.a && !keysPressed.d) {
        targetX = -1;
    }
    if (keysPressed.w && !keysPressed.s) {
        targetY = -1;
    }
    if (keysPressed.s && !keysPressed.w) {
        targetY = 1;
    }
    let answer = vectorCalc(current, { x: targetX, y: targetY }, 0.9);
    current = answer;
    player.x += 8 * answer.x;
    player.y += 8 * answer.y;
});
