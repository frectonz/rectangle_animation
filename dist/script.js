import { Utility } from "./Utility.js";

let canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let innerHeight = canvas.height;
let innerWidth = canvas.width;

let colors = [];
for (let i = 0; i < 10; i++) {
  colors.push(Utility.randomRGBA());
}

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  innerWidth = canvas.width;
  innerHeight = canvas.height;
  setup();
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("dblclick", setup);

class Particle {
  constructor(x, y, w, h, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    c.strokeRect(this.x, this.y, this.w, this.h);
    c.lineWidth = 10;
    c.strokeStyle = this.color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.w > canvas.width || this.x <= 0) {
      this.vx = -this.vx;
    }
    if (this.y <= 0 || this.y + this.h > canvas.height) {
      this.vy = -this.vy;
    }
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      this.x = 0;
      this.y = 0;
      this.w = 0;
      this.h = 0;
    }
    this.draw();
  }
}

let rectNum = 100;
let rectangles;

function setup() {
  rectangles = [];

  for (let i = 0; i < rectNum; i++) {
    let randW = Utility.randomIntFromRange(50, 100);
    let randH = Utility.randomIntFromRange(50, 100);

    let randX = Utility.randomIntFromRange(0 + randW, canvas.width - randW);
    let randY = Utility.randomIntFromRange(0 + randH, canvas.height - randH);

    let randVx = Utility.randomIntFromRange(-2, 2);
    let randVy = Utility.randomIntFromRange(-2, 2);

    let randColor = Utility.randomColors(colors);

    rectangles.push(
      new Particle(randX, randY, randW, randH, randVx, randVy, randColor)
    );
  }
}

function loop() {
  requestAnimationFrame(loop);

  c.fillStyle = "rgba(0, 0, 0, .03)";

  c.fillRect(0, 0, canvas.width, canvas.height);

  rectangles.forEach((rectangle) => {
    rectangle.update();
  });
}

setup();
loop();
