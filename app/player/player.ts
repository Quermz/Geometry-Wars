import * as PIXI from "PIXI.js";
import { Laser } from "./laser/laser.js";
import { vectorCalc } from "../utils/vectors.js";
const texture = await PIXI.Assets.load("./app/resources/player2.png");

class Player {
  sprite: PIXI.Sprite;
  keysPressed: { w: boolean; a: boolean; s: boolean; d: boolean };
  currentVelocity: { x: number; y: number };
  directionKey: string;
  counter: number;

  constructor(x = 200, y = 200, height = 50, width = 50) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.height = height;
    this.sprite.width = width;
    this.sprite.anchor.set(0.5);
    this.sprite.pivot.set(0.5);
    this.keysPressed = { w: false, a: false, s: false, d: false };
    this.directionKey = "up";
    this.currentVelocity = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
    this.counter = 0;
    let alphaFilter = new PIXI.AlphaFilter(1.5);

    window.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "d":
          this.keysPressed.d = true;
          break;
        case "a":
          this.keysPressed.a = true;
          break;
        case "w":
          this.keysPressed.w = true;
          break;
        case "s":
          this.keysPressed.s = true;
          break;
      }
    });

    window.addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "d":
          this.keysPressed.d = false;
          break;
        case "a":
          this.keysPressed.a = false;
          break;
        case "w":
          this.keysPressed.w = false;
          break;
        case "s":
          this.keysPressed.s = false;
          break;
      }
    });
    window.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "ArrowUp":
          this.directionKey = "up";
          break;
        case "ArrowDown":
          this.directionKey = "down";
          break;
        case "ArrowLeft":
          this.directionKey = "left";
          break;
        case "ArrowRight":
          this.directionKey = "right";
          break;
      }
    });
  }

  move(xLimit = 960, yLimit = 640) {
    let targetX = 0;
    let targetY = 0;

    if (this.keysPressed.d && !this.keysPressed.a) {
      targetX = 1;
    }
    if (this.keysPressed.a && !this.keysPressed.d) {
      targetX = -1;
    }
    if (this.keysPressed.w && !this.keysPressed.s) {
      targetY = -1;
    }
    if (this.keysPressed.s && !this.keysPressed.w) {
      targetY = 1;
    }
    let newVelocity = vectorCalc(
      this.currentVelocity,
      { x: targetX, y: targetY },
      0.9
    );
    this.currentVelocity = newVelocity;
    this.sprite.x += newVelocity.x * 4;
    this.sprite.y += newVelocity.y * 4;

    if (this.sprite.x < this.sprite.width / 2) {
      this.sprite.x = this.sprite.width / 2;
    } else if (this.sprite.x > xLimit - this.sprite.width / 2) {
      this.sprite.x = xLimit - this.sprite.width / 2;
    }
    if (this.sprite.y < this.sprite.height / 2) {
      this.sprite.y = this.sprite.height / 2;
    } else if (this.sprite.y > yLimit - this.sprite.height / 2) {
      this.sprite.y = yLimit - this.sprite.height / 2;
    }

    switch (this.directionKey) {
      case "up":
        this.sprite.rotation = 0;
        break;
      case "down":
        this.sprite.rotation = Math.PI;
        break;
      case "left":
        this.sprite.rotation = (3 / 2) * Math.PI;
        break;
      case "right":
        this.sprite.rotation = (1 / 2) * Math.PI;
        break;
    }
  }
  shoot() {
    this.counter += 1;
    if (this.counter == 20) {
      this.counter = 0;
      let laser = new Laser(this.sprite.x, this.sprite.y, this.directionKey, 8);

      return laser;
    } else {
      return false;
    }
  }
}

export { Player };
