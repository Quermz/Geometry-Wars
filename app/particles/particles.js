import * as PIXI from "PIXI.js";
class Particle {
    constructor() {
        this.container = new PIXI.Container();
        this.particleArray = [];
    }
    create(colour, shape) {
        for (let i = 0; i < 5; i++) {
            let particle = {
                sprite: new PIXI.Graphics(),
                direction: { x: 1 - 2 * Math.random(), y: 1 - 2 * Math.random() },
            };
            particle.sprite.lineStyle(1.5, colour);
            if (shape == "circle") {
                let size = 1 + 5 * Math.random();
                particle.sprite.drawCircle(0, 0, size);
            }
            if (shape == "square") {
                let size = 5 + 5 * Math.random();
                particle.sprite.drawRect(0, 0, size, size);
            }
            particle.sprite.x = 200;
            particle.sprite.y = 200;
            this.container.addChild(particle.sprite);
            this.particleArray.push(particle);
            console.log(particle.sprite.alpha);
        }
    }
    move() {
        for (let particle of this.particleArray) {
            particle.sprite.x += particle.direction.x / 2;
            particle.sprite.y += particle.direction.y / 2;
            particle.sprite.alpha -= 0.005 + Math.random() / 1000;
        }
    }
}
export { Particle };
