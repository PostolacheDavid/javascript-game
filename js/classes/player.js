class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc,
    frameRate,
    scale,
    animations,
  }) {
    super({ position, imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };

    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };

    this.animations = animations;
    this.lastDirection = "right";

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }

    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  updateCameraBox() {
    this.cameraBox = {
      position: {
        x: this.position.x - 40,
        y: this.position.y,
      },
      width: 400,
      height: 260,
    };
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 1718 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  shouldPanCameraToTheRight({ camera }) {
    const cameraboxRightSide = this.cameraBox.position.x + this.cameraBox.width;
    const screenRightEdge = Math.abs(camera.position.x) + scaledCanvas.width;

    if (cameraboxRightSide >= 1718) return;

    if (cameraboxRightSide >= screenRightEdge) {
      camera.position.x += this.velocity.x;
    }
  }

  shouldPanCameraToTheLeft({ camera }) {
    const cameraBoxLeftSide = this.cameraBox.position.x;
    const screenLeftEdge = Math.abs(camera.position.x);

    if (cameraBoxLeftSide <= 0) return;

    if (cameraBoxLeftSide <= screenLeftEdge) {
      camera.position.x += this.velocity.x;
    }
  }

  update() {
    this.updateFrames();
    this.updateHitBox();

    this.updateCameraBox();

    c.fillStyle = "rgba(0, 0, 255, 0.2)";
    c.fillRect(
      this.cameraBox.position.x,
      this.cameraBox.position.y,
      this.cameraBox.width,
      this.cameraBox.height
    );

    //this draws the image
    /* c.fillStyle = "rgba(0, 255, 0, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height); */

    //this draws the hitbox
    /* c.fillStyle = "rgba(255, 0, 0, 0.2)";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    ); */

    this.draw();
    this.position.x += this.velocity.x;
    this.updateHitBox();
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.updateHitBox();
    this.checkForVerticalCollisions();
  }

  updateHitBox() {
    this.hitbox = {
      position: {
        x: this.position.x + 130,
        y: this.position.y + 100,
      },
      width: 70,
      height: 110,
    };
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;

          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }

    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const block = this.platformCollisionBlocks[i];

      const isColliding = collision({ object1: this.hitbox, object2: block });

      if (
        isColliding &&
        this.velocity.y > 0 &&
        this.hitbox.position.y + this.hitbox.height <=
          block.position.y + this.velocity.y
      ) {
        this.velocity.y = 0;

        const offset =
          this.hitbox.position.y - this.position.y + this.hitbox.height;

        this.position.y = block.position.y - offset - 0.01;
        break;
      }
    }
  }
}
