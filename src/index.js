import Phaser from "phaser";

const config = {
  //WebGL (Web Graphics Library) JS API for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    //Arcade physics plugin manages physics simulation
    default: "arcade",
  },
  scene: {
    //Has 3 basic functions: preload, create and update
    preload,
    create,
  },
};

//Loading assets, such as images, music, animations...
function preload() {
  //"this" context - scene
  //contains usable functions and properties
  //need to specify 2 values: key, file path
  this.load.image("sky-background", "assets/sky.png");
}

//Initializing instances of the objects
function create() {
  //need to specify 3 values: x-coordinate, y-coordinate, key
  this.add.image(0, 0, "sky-background");
}

new Phaser.Game(config);
