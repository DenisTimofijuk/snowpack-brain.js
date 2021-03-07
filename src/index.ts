import {network} from './modules/brain-handler';
import type Pixel from './modules/pixel';
import type brain from 'brain.js';
import {initPixels} from './modules/EYE';
import {collectTrtainingData, saveCollection} from './helper/collectTrainingData';
import drawTrainingData from './helper/drawTrainingData';


export const TOTAL_PIXELS = 25;
export const PIXEL_STEP = Math.sqrt(TOTAL_PIXELS);
const ENABLE_TRAINING_DATA_COLLECTION = false;

const pixels: Pixel[] = [];
const draw = initPixels(pixels);
const collectHandler = collectTrtainingData(pixels);

initScreenEvents();

function initScreenEvents() {
  const screenCanvas = document.getElementById("eye") as HTMLCanvasElement;
  screenCanvas.addEventListener("mousemove", draw);
  screenCanvas.addEventListener("contextmenu", (e) => { e.preventDefault(); return false; });

  document.getElementById('init-process')?.addEventListener('click', runBrain);
  document.getElementById('show-training-data')?.addEventListener('click', ()=>drawTrainingData(pixels));

  if(ENABLE_TRAINING_DATA_COLLECTION){
    document.getElementById('save')?.addEventListener('click', collectHandler);
    document.getElementById('get-training-data')?.addEventListener('click', saveCollection);

    document.getElementById('init-process') ? document.getElementById('init-process')!.style.display = "none" : '';
  }else{
    document.getElementById('save') ? document.getElementById('save')!.style.display = "none" : '';
    document.getElementById('control-panel-training') ? document.getElementById('control-panel-training')!.style.display = "none" : '';
  }
}

function runBrain() {
  const inputArray:number[] = [];
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