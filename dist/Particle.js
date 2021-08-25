export class Particle {
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

  update(mouse) {
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
