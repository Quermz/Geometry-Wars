interface vector {
  x: number;
  y: number;
}

function vectorCalc(current: vector, desired: vector, roc: number): vector {
  let target = convertVector(desired);
  let tempX = current.x * roc + target.x * (1 - roc);
  let tempY = current.y * roc + target.y * (1 - roc);
  //console.log(tempX);
  if (tempX < 0.0001 && tempX > -0.0001) {
    tempX = 0;
  }
  if (tempX > 0.999) {
    tempX = 1;
  }
  if (tempY < 0.0001 && tempY > -0.0001) {
    tempY = 0;
  }
  if (tempY > 0.999) {
    tempY = 1;
  }
  let result = {
    x: tempX,
    y: tempY,
  };

  return result;
}

function convertVector(vec: vector): vector {
  let conv = Math.sqrt(vec.x ** 2 + vec.y ** 2);
  if (conv == 0) {
    return { x: 0, y: 0 };
  }
  return { x: vec.x / conv, y: vec.y / conv };
}

export { vectorCalc, vector };
