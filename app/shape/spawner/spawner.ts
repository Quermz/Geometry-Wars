import * as PIXI from "PIXI.js";
import { Shape, Square, Circle, Triangle } from "../shape.js";
import { Score } from "app/score/score.js";

let count = 0;

let counterLimit = 10;

let shapeLimit = 40;

let oldScore = 0;

function spawner(
  delta: number,
  score: number,
  liveShapes: number,
  playerX: number = 0,
  playerY: number = 0
) {
  if (score > oldScore + 500) {
    if (shapeLimit < 50) shapeLimit += 5;
    if (counterLimit > 20) counterLimit -= 5;
  }

  count += 1;
  if (count >= counterLimit * delta) {
    count = 0;

    let spawnPoints = [
      [0, 0],
      [0, 640],
      [960, 0],
      [960, 640],
    ];

    let seed = Math.ceil(Math.random() * 3);

    if (playerX > 480) {
      if (playerY > 320) {
        spawnPoints.splice(3, 1);
      } else {
        spawnPoints.splice(2, 1);
      }
    } else {
      if (playerY > 320) {
        spawnPoints.splice(1, 1);
      } else {
        spawnPoints.splice(0, 1);
      }
    }
    let spawnPoint = spawnPoints[seed - 1];

    if (liveShapes < shapeLimit) {
      let shapeNumber = Math.ceil(Math.random() * 8);
      let shape;
      if (shapeNumber == 1) {
        shape = new Triangle(20, 20, spawnPoint[0], spawnPoint[1]);
      } else if (shapeNumber > 1 && shapeNumber < 4) {
        shape = new Circle(20, spawnPoint[0], spawnPoint[1]);
      } else {
        shape = new Square(20, 20, spawnPoint[0], spawnPoint[1]);
      }

      return shape;
    }
  }
  return false;
}

export { spawner };
