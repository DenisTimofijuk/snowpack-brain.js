import trainingData from '../JSON/training/data.v0.json';
import type Pixel from '../modules/pixel';

const DOWNLOAD_IMAGES = false;

export default async function drawTrainingData(pixels: Pixel[]) {
  const label = document.getElementById('training-value')!;
  let index = 0;
  for (let data of trainingData.numbers) {
    clear(pixels);
    label.innerHTML = Object.keys(data.output) + '';
    await draw(data.input, pixels);
    DOWNLOAD_IMAGES && await downloadImage(index);
    index++;
  }
  label.innerHTML = '';
}

function clear(pixels: Pixel[]) {
  pixels.forEach((pixel) => pixel.clear());
}

function draw(data: number[], pixels: Pixel[]) {
  data.forEach((value, index) => {
    value > 0 && pixels[index].draw();
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is done.');
    }, 250);
  });
}

function downloadImage(index: number) {
  const canvas = document.getElementById('eye')! as HTMLCanvasElement;
  const image = canvas.toDataURL();

  const tmpLink = document.createElement('a');
  tmpLink.download = `training-data-${index}.png`;
  tmpLink.href = image;
  tmpLink.click();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is done.');
    }, 5000);
  });
}
