export default class Pixel {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  screen: HTMLCanvasElement;
  index: number;
  state: boolean;
  constructor(width: number, height: number, x: number, y: number, screen: HTMLCanvasElement, index: number) {
    this.state = false;
    this.index = index;
    this.screen = screen;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
    this.debug();
    this.display();
  }

  init() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(0, 0, this.width, this.height);
    this.ctx.closePath();
  }

  draw() {
    if (this.state) {
      return;
    }
    const padding = 5;
    this.state = true;
    this.ctx.beginPath();
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(padding, padding, this.width - padding * 2, this.height - padding * 2);
    this.ctx.closePath();
    this.display();
  }

  display() {
    const screenContext = this.screen.getContext('2d');
    screenContext?.clearRect(this.x, this.y, this.width, this.height);
    screenContext?.drawImage(this.canvas, this.x, this.y);
  }

  drawNeuronIndication() {
    const padding = 10;
    this.state = true;
    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(padding, padding, this.width - padding * 2, this.height - padding * 2);
    this.ctx.closePath();
    this.display();
  }

  clear() {
    if (!this.state) {
      return;
    }
    this.state = false;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.init();
    this.debug();
    this.display();
  }

  debug() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.index.toString(), this.width / 2, this.height / 2);
  }
}