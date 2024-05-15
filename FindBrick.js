function FindBrick(brickName) {
    return world.bricks.find((brick) => brick.name === brickName);
}
module.exports = FindBrick