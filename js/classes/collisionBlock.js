const tileSize = 32;

class CollisionsBlock {
  constructor({ position }) {
    this.position = position;
    this.width = tileSize;
    this.height = tileSize;
  }

  draw() {
    /* c.fillStyle = "rgba(0, 0, 255, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height); */
  }

  update() {
    this.draw();
  }
}
