const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width,
  height: canvas.height,
};

const Collisions2D = [];
for (let i = 0; i < Collisions.length; i += 54) {
  Collisions2D.push(Collisions.slice(i, i + 54));
}

const collisionBlocks = [];
Collisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1) {
      console.log("draw a block here");
      collisionBlocks.push(
        new CollisionsBlock({
          position: {
            x: x * 32,
            y: y * 32,
          },
        })
      );
    }
  });
});

console.log(collisionBlocks);

const gravity = 0.5;

const player = new Player({
  position: {
    x: 200,
    y: 0,
  },
  collisionBlocks,
  imageSrc: "./../img/warrior/Idle.png",
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./../img/background_img_upscaled.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(
    canvas.width / scaledCanvas.width,
    canvas.height / scaledCanvas.height
  );
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  player.update();
  c.restore();

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.a.pressed) {
    player.velocity.x = -5;
  }
}

animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -18;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
