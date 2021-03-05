import {network} from './brain-handler';
import type Pixel from './pixel';
import type brain from 'brain.js';
import {initPixels} from './EYE';

export const TOTAL_PIXELS = 25;
export const PIXEL_STEP = Math.sqrt(TOTAL_PIXELS);

const inputArray:number[] = [];
const pixels: Pixel[] = [];
const draw = initPixels(pixels);

initScreenEvents();


function initScreenEvents() {
  const screenCanvas = document.getElementById("eye") as HTMLCanvasElement;
  screenCanvas.addEventListener("mousemove", draw);
  screenCanvas.addEventListener("contextmenu", (e) => { e.preventDefault(); return false; });

  document.getElementById('init-process')?.addEventListener('click', runBrain);
}

function runBrain() {
  inputArray.length = 0;
  pixels.forEach(pixel => {
    inputArray.push( (pixel.state ? 1 : 0) );
  })

  const output = network.run(inputArray);
  displayWhatBrainThinks(output);
}

function displayWhatBrainThinks(output: brain.NeuralNetworkInput) {
  const result = output as any;

  document.getElementById('result-for-0')!.innerHTML = result['0'].toFixed(4);
  document.getElementById('result-for-1')!.innerHTML = result['1'].toFixed(4);
  document.getElementById('result-for-2')!.innerHTML = result['2'].toFixed(4);
  document.getElementById('result-for-3')!.innerHTML = result['3'].toFixed(4);
  document.getElementById('result-for-4')!.innerHTML = result['4'].toFixed(4);
  document.getElementById('result-for-5')!.innerHTML = result['5'].toFixed(4);
  document.getElementById('result-for-6')!.innerHTML = result['6'].toFixed(4);
  document.getElementById('result-for-7')!.innerHTML = result['7'].toFixed(4);
  document.getElementById('result-for-8')!.innerHTML = result['8'].toFixed(4);
  document.getElementById('result-for-9')!.innerHTML = result['9'].toFixed(4);
  
}