function collision(primary, secondary) {
    let xTrue = false;
    let yTrue = false;
    if (primary.sprite.x + primary.edge > secondary.sprite.x + secondary.edge &&
        primary.sprite.x - primary.edge < secondary.sprite.x + secondary.edge) {
        xTrue = true;
    }
    else if (primary.sprite.x + primary.edge > secondary.sprite.x - secondary.edge &&
        primary.sprite.x - primary.edge < secondary.sprite.x - secondary.edge) {
        xTrue = true;
    }
    else if (primary.sprite.x + primary.edge < secondary.sprite.x + secondary.edge &&
        primary.sprite.x - primary.edge > secondary.sprite.x - secondary.edge) {
        xTrue = true;
    }
    if (primary.sprite.y + primary.edge > secondary.sprite.y + secondary.edge &&
        primary.sprite.y - primary.edge < secondary.sprite.y + secondary.edge) {
        yTrue = true;
    }
    else if (primary.sprite.y + primary.edge > secondary.sprite.y - secondary.edge &&
        primary.sprite.y - primary.edge < secondary.sprite.y - secondary.edge) {
        yTrue = true;
    }
    else if (primary.sprite.y + primary.edge < secondary.sprite.y + secondary.edge &&
        primary.sprite.y - primary.edge > secondary.sprite.y - secondary.edge) {
        yTrue = true;
    }
    if (xTrue && yTrue) {
        return true;
    }
    return false;
}
export { collision };
