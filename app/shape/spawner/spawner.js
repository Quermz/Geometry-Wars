import { Square, Circle, Triangle } from "../shape.js";
let count = 0;
function spawner(delta, shapeLimit, counterLimit, liveShapes, playerX = 0, playerY = 0) {
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
            }
            else {
                spawnPoints.splice(2, 1);
            }
        }
        else {
            if (playerY > 320) {
                spawnPoints.splice(1, 1);
            }
            else {
                spawnPoints.splice(0, 1);
            }
        }
        let spawnPoint = spawnPoints[seed - 1];
        if (liveShapes < shapeLimit) {
            let shapeNumber = Math.ceil(Math.random() * 8);
            let shape;
            if (shapeNumber == 1) {
                shape = new Triangle(20, 20, spawnPoint[0], spawnPoint[1]);
            }
            else if (shapeNumber > 1 && shapeNumber < 4) {
                shape = new Circle(20, spawnPoint[0], spawnPoint[1]);
            }
            else {
                shape = new Square(20, 20, spawnPoint[0], spawnPoint[1]);
            }
            return shape;
        }
    }
    return false;
}
export { spawner };
