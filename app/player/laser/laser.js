import * as PIXI from "PIXI.js";
class Laser {
    constructor(x, y, direction, velocity) {
        this.sprite = new PIXI.Graphics();
        this.sprite.lineStyle(1.5, "0xFF0000");
        this.sprite.drawCircle(x, y, 3);
        this.direction = direction;
        this.velocity = velocity;
    }
    move() {
        switch (this.direction) {
            case "up":
                this.sprite.y -= this.velocity;
                break;
            case "down":
                this.sprite.y += this.velocity;
                break;
            case "left":
                this.sprite.x -= this.velocity;
                break;
            case "right":
                this.sprite.x += this.velocity;
                break;
        }
    }
    bounds(xLimit = 960, yLimit = 640) {
        if (this.sprite.x < -xLimit) {
            console.log("THIS");
            console.log(this.sprite.x, this.sprite.y);
            return true;
        }
        else if (this.sprite.x > xLimit * 2) {
            return true;
        }
        if (this.sprite.y < -yLimit) {
            console.log("THIS");
            console.log(this.sprite.x, this.sprite.y);
            return true;
        }
        else if (this.sprite.y > yLimit * 2) {
            return true;
        }
        return false;
    }
}
export { Laser };
