
import { PIXEL_STEP, TOTAL_PIXELS } from "./index";
import Pixel from "./pixel";

export function initPixels(pixels:Pixel[]) {
    const screenCanvas = document.getElementById("eye") as HTMLCanvasElement;
    const pixelWidth = screenCanvas.width / PIXEL_STEP;
    const pixelHeight = screenCanvas.height / PIXEL_STEP;
    let x = 0;
    let y = 0;
    for (let index = 0; index < TOTAL_PIXELS; index++) {
      pixels.push(new Pixel(pixelWidth, pixelHeight, x, y, screenCanvas, index));
      x += pixelWidth;
      if (x >= screenCanvas.width) {
        y += pixelHeight;
        x = 0;
      }
    }
  
    return function draw(event: MouseEvent) {
      if (event.buttons !== 1 && event.buttons !== 2) {
        return;
      }
  
      const x = Math.ceil(event.offsetX / pixelWidth);
      const y = Math.ceil(event.offsetY / pixelHeight);
      const index = y * PIXEL_STEP - PIXEL_STEP + x - 1;
  
      if (event.buttons === 1) {
        pixels[index] && pixels[index].draw();
      }
      if (event.buttons === 2) {
        pixels[index] && pixels[index].clear();
      }
    }
  }