import * as PIXI from "PIXI.js";
class Score {
    constructor() {
        this.text = new PIXI.Text("00000");
        this.text.anchor.set(1, 0);
        this.text.x = 950;
        this.text.y = 10;
        this.text.style = {
            fill: "white",
            fontFamily: "VT323",
            fontSize: 40,
        };
        this.score = 0;
        this.counter = 0;
    }
    incremenetScore() {
        this.counter += 1;
        if (this.counter == 7) {
            this.score += 1;
            this.text.text = this.addZeroes();
            this.counter = 0;
        }
    }
    addZeroes() {
        let fullScore = "";
        fullScore += this.score;
        let extraZeroes = 5 - fullScore.length;
        for (let i = 0; i < extraZeroes; i++) {
            fullScore = "0" + fullScore;
        }
        return fullScore;
    }
    shapeHit(shape) {
        switch (shape) {
            case "triangle":
                this.score += 20;
                break;
            case "circle":
                this.score += 10;
                break;
            case "square":
                this.score += 5;
                break;
        }
    }
}
export { Score };
