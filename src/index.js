import Phaser from "phaser";

const config = {
  //WebGL (Web Graphics Library) JS API for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    //Arcade physics plugin manages physics simulation
    default: "arcade",
    arcade: {
      debug: true,
      //gravity: { y: 200 },
    },
  },
  scene: {
    //Has 3 basic functions: preload, create and update
    preload,
    create,
    update,
  },
};

//Loading assets, such as images, music, animations...
function preload() {
  //"this" context - scene
  //contains usable functions and properties
  //need to specify 2 values: key, file path
  this.load.image("sky-background", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}

const VELOCITY = 200;

let bird = null;

//Initializing instances of the objects
function create() {
  //need to specify 3 values: x-coordinate, y-coordinate, key
  //this.add.image(config.width / 2, config.height / 2, "sky-background");
  this.add.image(0, 0, "sky-background").setOrigin(0);
  bird = this.physics.add
    .sprite(config.width * 0.1, config.height / 2, "bird")
    .setOrigin(0);
  //bird.body.gravity.y = 200;
  bird.body.velocity.x = VELOCITY;
}

//properties are total time and the time passed since last frame
function update(time, delta) {
  //bird.x || bird.body.x || bird.body.position.x
  if (bird.x >= config.width - bird.width) {
    bird.body.velocity.x = -VELOCITY;
  } else if (bird.x <= 0) {
    bird.body.velocity.x = VELOCITY;
  }
}

new Phaser.Game(config);
