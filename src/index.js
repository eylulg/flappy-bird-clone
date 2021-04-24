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
    },
  },
  scene: {
    //Has 3 basic functions: preload, create and update
    preload,
    create,
    update,
  },
};

const PIPES_TO_RENDER = 4;

let bird = null;
let pipes = null;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [380, 420];

const initialBirdPosition = { x: config.width * 0.1, y: config.height * 0.5 };
const flapVelocity = 300;

//Loading assets, such as images, music, animations...
function preload() {
  //"this" context - scene
  //contains usable functions and properties
  //need to specify 2 values: key, file path
  this.load.image("sky-background", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

//Initializing instances of the objects
function create() {
  //need to specify 3 values: x-coordinate, y-coordinate, key
  //this.add.image(config.width / 2, config.height / 2, "sky-background");
  this.add.image(0, 0, "sky-background").setOrigin(0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, "bird")
    .setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    //const upperPipe = this.physics.add.sprite(0, 0, "pipe").setOrigin(0, 1);
    //const lowerPipe = this.physics.add.sprite(0, 0, "pipe").setOrigin(0);
    const upperPipe = pipes.create(0, 0, "pipe").setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, "pipe").setOrigin(0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown-SPACE", flap);
}

//properties are total time and the time passed since last frame
function update(time, delta) {
  if (bird.y < -bird.height || bird.y > config.height) {
    restartBirdPosition();
  }

  recyclePipes();
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function placePipe(upperPipe, lowerPipe) {
  const rightMostPipeHorizontalDistance = getRightMostPipe();
  const pipeHorizontalDistance = Phaser.Math.Between(
    ...pipeHorizontalDistanceRange
  );
  //const pipeVerticalDistance = Phaser.Math.Between(pipeVerticalDistanceRange[0], pipeVerticalDistanceRange[1]);
  const pipeVerticalDistance = Phaser.Math.Between(
    ...pipeVerticalDistanceRange
  );
  const pipeVerticalPosition = Phaser.Math.Between(
    20,
    config.height - pipeVerticalDistance - 20
  );

  upperPipe.x = rightMostPipeHorizontalDistance + pipeHorizontalDistance;
  upperPipe.y = pipeVerticalPosition;

  lowerPipe.x = upperPipe.x;
  lowerPipe.y = upperPipe.y + pipeVerticalDistance;

  //upperPipe.body.velocity.x = -200;
  //lowerPipe.body.velocity.x = -200;
}

function recyclePipes() {
  const tempPipes = [];
  pipes.getChildren().forEach(function (pipe) {
    if (pipe.getBounds().right <= 0) {
      tempPipes.push(pipe);
      if (tempPipes.length === 2) {
        placePipe(...tempPipes);
        return;
      }
    }
  });
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

new Phaser.Game(config);
