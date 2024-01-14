import * as PIXI from "PIXI.js";
import { vectorCalc } from "./utils/vectors.js";
import { Player } from "./player/player.js";

const texture = await PIXI.Assets.load("./app/resources/player.jpg");

const app = new PIXI.Application<HTMLCanvasElement>({
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

// const ball = new PIXI.Sprite(texture);

// ball.height = 50;
// ball.width = 50;
// ball.x = 550;
// ball.y = 270;

// let keysPressed = { w: false, a: false, s: false, d: false };

// let downKey = "up";

// window.addEventListener("keydown", ({ key }) => {
//   if (key == "d") {
//     keysPressed.d = true;
//   }
//   if (key == "a") {
//     keysPressed.a = true;
//   }
//   if (key == "w") {
//     keysPressed.w = true;
//   }
//   if (key == "s") {
//     keysPressed.s = true;
//   }
// });

// window.addEventListener("keyup", ({ key }) => {
//   if (key == "d") {
//     keysPressed.d = false;
//   }
//   if (key == "a") {
//     keysPressed.a = false;
//   }
//   if (key == "w") {
//     keysPressed.w = false;
//   }
//   if (key == "s") {
//     keysPressed.s = false;
//   }
// });

// window.addEventListener("keydown", ({ key }) => {
//   if (key == "ArrowUp") {
//     downKey = "up";
//   }
//   if (key == "ArrowDown") {
//     downKey = "down";
//   }
//   if (key == "ArrowLeft") {
//     downKey = "left";
//   }
//   if (key == "ArrowRight") {
//     downKey = "right";
//   }
//   console.log(downKey);
// });

// app.stage.addChild(ball);

// document.body.appendChild(app.view);
// ball.anchor.set(0.5);
// ball.pivot.set(0.5);

// let targetX = 0;
// let targetY = 0;
// let current = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
// app.ticker.add((delta) => {
//   let targetX = 0;
//   let targetY = 0;
//   if (keysPressed.d && !keysPressed.a) {
//     targetX = 1;
//   }
//   if (keysPressed.a && !keysPressed.d) {
//     targetX = -1;
//   }
//   if (keysPressed.w && !keysPressed.s) {
//     targetY = -1;
//   }
//   if (keysPressed.s && !keysPressed.w) {
//     targetY = 1;
//   }
//   let answer = vectorCalc(current, { x: targetX, y: targetY }, 0.9);
//   current = answer;
//   ball.x += answer.x * 4;
//   ball.y += answer.y * 4;
//   switch (downKey) {
//     case "up":
//       ball.rotation = 0;
//       break;
//     case "down":
//       ball.rotation = Math.PI;
//       break;
//     case "left":
//       ball.rotation = (3 / 2) * Math.PI;
//       break;
//     case "right":
//       ball.rotation = (1 / 2) * Math.PI;
//       break;
//   }
// });

// console.log(Math.PI);
