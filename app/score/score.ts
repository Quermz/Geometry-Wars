import * as PIXI from "PIXI.js";

class Score {
  text: PIXI.Text;
  score: number;
  counter: number;
  flashCounter: number;
  constructor() {
    this.text = new PIXI.Text("00000");
    this.text.anchor.set(0.5, 0.5);
    this.text.x = 910;
    this.text.y = 25;
    this.text.zIndex;
    this.text.style = {
      fill: "white",
      fontFamily: "VT323",
      fontSize: 40,
    };
    this.score = 0;
    this.counter = 0;
    this.flashCounter = 0;
    this.text.alpha = 0;
  }
  reset() {
    this.text.text = "00000";
    this.text.x = 910;
    this.text.y = 25;
    this.text.zIndex;
    this.text.style = {
      fill: "white",
      fontFamily: "VT323",
      fontSize: 40,
    };
    this.score = 0;
    this.counter = 0;
    this.flashCounter = 0;
    this.text.alpha = 1;
  }
  incremenetScore() {
    this.text.alpha = 1;
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
  shapeHit(shape: string) {
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
  flash() {
    this.text.style = {
      fill: "white",
      fontFamily: "VT323",
      fontSize: 60,
    };
    this.text.x = 480;
    this.text.y = 40;
    if (this.flashCounter < 20) {
      this.flashCounter++;
      this.text.alpha -= 0.025;
    } else if (this.flashCounter < 40) {
      this.flashCounter++;
      this.text.alpha += 0.025;
    } else {
      this.flashCounter = 0;
    }
  }
}

export { Score };
