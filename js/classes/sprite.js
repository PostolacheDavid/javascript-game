class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
  }

  draw() {
    if (this.image.complete && this.image.naturalWidth > 0) {
      console.log("Drawing player Image");
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      console.log("Drawing player rectangle");
      c.fillStyle = "red";
      c.fillRect(this.position.x, this.position.y, 32, 64);
    }
  }

  update() {
    this.draw();
  }
}
