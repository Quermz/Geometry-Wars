import * as PIXI from "PIXI.js";
import { vectorCalc } from "../utils/vectors.js";
import { Particle } from "../particles/particles.js";
class Shape {
    constructor(height, width, x, y, shape, colour) {
        this.sprite = new PIXI.Graphics();
        this.sprite.height = height;
        this.sprite.width = width;
        this.sprite.x = x;
        this.sprite.y = y;
        this.edge = height;
        this.hit = false;
        this.live = true;
        this.shape = shape;
        this.colour = colour;
        this.sprite.alpha = 0;
    }
    explode() {
        this.live = false;
        if (this.hit && !this.live) {
            let particles = new Particle();
            particles.create(this.colour, this.shape, this.sprite.x, this.sprite.y);
            return particles;
        }
    }
    move(x = 0, y = 0) { }
    spawn() {
        if (this.sprite.alpha < 1)
            this.sprite.alpha += 0.01;
    }
}
class Square extends Shape {
    constructor(height, width, x, y) {
        super(height, width, x, y, "square", "green");
        this.sprite.lineStyle(1.5, this.colour);
        this.sprite.drawRect(0, 0, height, width);
        this.currentVelocity = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
        this.counter = 0;
    }
    move(x = 0, y = 0) {
        this.spawn();
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
    destory() { }
}
class Circle extends Shape {
    constructor(width, x, y) {
        super(width, width, x, y, "circle", "blue");
        this.sprite.lineStyle(1.5, this.colour);
        this.sprite.drawCircle(0, 0, width);
        this.currentVelocity = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
        this.counter = 0;
    }
    move(x = 0, y = 0) {
        this.spawn();
        this.counter += 1;
        if (this.counter <= 200) {
            let targetX = 0;
            let targetY = 0;
            if (this.sprite.x < x) {
                targetX = 1 - Math.random();
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
            let newVelocity = vectorCalc(this.currentVelocity, { x: targetX, y: targetY }, 0.98);
            this.currentVelocity = newVelocity;
            this.sprite.x += newVelocity.x * (1.5 + Math.random());
            this.sprite.y += newVelocity.y * (1.5 + Math.random());
        }
        else if (this.counter > 200) {
            let targetX = Math.random();
            let targetY = Math.random();
            let newVelocity = vectorCalc(this.currentVelocity, { x: targetX, y: targetY }, 0.98);
            this.currentVelocity = newVelocity;
            this.sprite.x += newVelocity.x * 3;
            this.sprite.y += newVelocity.y * 3;
            if (this.counter > 250) {
                this.counter = 0;
            }
        }
    }
}
class Triangle extends Shape {
    constructor(height, x, y) {
        super(30, 30, x, y, "triangle", "red");
        const path = [0, 50, 25, 50 - (50 * Math.sqrt(3)) / 2, 50, 50];
        this.sprite.lineStyle(1.5, this.colour);
        this.sprite.drawPolygon(path);
        this.sprite.endFill();
        this.currentVelocity = vectorCalc({ x: 0, y: 0 }, { x: 0, y: 0 }, 0.92);
    }
    move(x = 0, y = 0) {
        this.spawn();
        let targetX = 0;
        let targetY = 0;
        if (this.sprite.x < x) {
            this.sprite.rotation += 0.0005 * Math.PI;
            targetX = 1;
        }
        else if (this.sprite.x > x) {
            this.sprite.rotation -= 0.0005 * Math.PI;
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
        this.sprite.x += newVelocity.x * 0.5;
        this.sprite.y += newVelocity.y * 0.5;
    }
}
export { Shape, Square, Circle, Triangle };
