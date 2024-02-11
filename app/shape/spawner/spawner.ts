import * as PIXI from "PIXI.js";
import { Shape, Square, Circle, Triangle } from "../shape.js";

let count = 0;

function spawner(
  shapeLimit: number,
  counterLimit: number,
  liveShapes: number,
  playerX: number = 0,
  playerY: number = 0
) {
  count += 1;
  if (count >= counterLimit) {
    count = 0;

    let spawnPoints = [
      [0, 0],
      [0, 640],
      [960, 0],
      [960, 640],
    ];

    let seed = Math.ceil(Math.random() * 2);

    if (playerX > 480) {
      spawnPoints.splice(3, 1);
      spawnPoints.splice(2, 1);
    } else {
      spawnPoints.splice(1, 1);

      spawnPoints.splice(0, 1);
    }
    let spawnPoint = spawnPoints[seed - 1];
    console.log(spawnPoints);
    console.log(spawnPoint);
    if (liveShapes < shapeLimit) {
      let shapeNumber = Math.ceil(Math.random() * 8);
      let shape;
      if (shapeNumber == 1) {
        shape = new Triangle(20, spawnPoint[0], spawnPoint[1]);
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
