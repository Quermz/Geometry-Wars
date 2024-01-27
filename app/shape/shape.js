import * as PIXI from "PIXI.js";
import { vectorCalc } from "../utils/vectors.js";
class Shape {
    constructor(height, width, x, y) {
        this.sprite = new PIXI.Graphics();
        this.sprite.height = height;
        this.sprite.width = width;
        this.sprite.x = x;
        this.sprite.y = y;
    }
}
class Square extends Shape {
    constructor(height, width, x, y) {
        super(height, width, x, y);
        this.sprite.lineStyle(1.5, "green");
        this.sprite.drawRect(0, 0, height, width);
        this.currentVelocity = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
        this.counter = 0;
    }
    move(x = 0, y = 0) {
        this.counter += 1;
        if (this.counter < 200) {
            let targetX = 0;
            let targetY = 0;
            if (this.sprite.x < x) {
                this.sprite.rotation += 0.01 * Math.PI;
                targetX = 1;
            }
            else if (this.sprite.x > x) {
                this.sprite.rotation -= 0.01 * Math.PI;
                targetX = -1;
            }
            if (this.sprite.y < y) {
                targetY = 1;
            }
            else if (this.sprite.y > y) {
                targetY = -1;
            }
            let newVelocity = vectorCalc(this.currentVelocity, { x: targetX, y: targetY }, 0.98);
            this.currentVelocity = newVelocity;
            this.sprite.x += newVelocity.x * 2;
            this.sprite.y += newVelocity.y * 2;
        }
        else if (this.counter == 200) {
            console.log(this.currentVelocity);
            let newVelocity = {
                x: -this.currentVelocity.x,
                y: -this.currentVelocity.y,
            };
            this.currentVelocity = newVelocity;
        }
        else if (this.counter > 200) {
            this.sprite.x += this.currentVelocity.x * 3;
            this.sprite.y += this.currentVelocity.y * 3;
            if (this.counter > 210) {
                this.counter = 0;
            }
        }
    }
}
class Circle extends Shape {
    constructor(width, x, y) {
        super(width, width, x, y);
        this.sprite.lineStyle(1.5, "blue");
        this.sprite.drawCircle(0, 0, width);
        this.currentVelocity = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
    }
    move(x = 0, y = 0) {
        let targetX = 0;
        let targetY = 0;
        if (this.sprite.x < x) {
            targetX = 1;
        }
        else if (this.sprite.x > x) {
            targetX = -1;
        }
        if (this.sprite.y < y) {
            targetY = 1;
        }
        else if (this.sprite.y > y) {
            targetY = -1;
        }
        let newVelocity = vectorCalc(this.currentVelocity, { x: targetX, y: targetY }, 0.99);
        this.currentVelocity = newVelocity;
        this.sprite.x += newVelocity.x * 3;
        this.sprite.y += newVelocity.y * 3;
    }
}
export { Square, Circle };
