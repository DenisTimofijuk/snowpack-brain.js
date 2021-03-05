import {network} from './modules/brain-handler';
import type Pixel from './modules/pixel';
import type brain from 'brain.js';
import {initPixels} from './modules/EYE';

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
  });
  const output = network.run(inputArray);
  displayWhatBrainThinks(output);
}

function displayWhatBrainThinks(output: brain.NeuralNetworkInput) {
  const result = output as any;

  for(let key in result){
    const placeHolder = document.getElementById(`result-for-${key}`)!;
    const prediction = (result[key] * 100).toFixed(2);
    placeHolder.innerHTML = prediction + "%";
    
    const green = Math.round(180 - 180 * result[key]);
    placeHolder.style.color = `rgb(163,${green},255)`
  };  
}