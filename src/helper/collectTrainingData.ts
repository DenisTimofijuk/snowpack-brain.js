import type Pixel from '../modules/pixel';
import {saveToFile} from './saveTrainedData';

const trainigData = {
    numbers: <any>[],
  };

export function collectTrtainingData(pixels: Pixel[]) {
  return function collectHandler() {
    const inputArray: number[] = [];
    inputArray.length = 0;
    pixels.forEach((pixel) => {
      inputArray.push(pixel.state ? 1 : 0);
    });

    const key = document.querySelector('input[type=radio]:checked')!.getAttribute('val')!;
    const output = <any>{};
    output[key] = 1;


    trainigData.numbers.push({
        "input": inputArray,
        "output": output
    })
  };
}

export function saveCollection() {
    saveToFile(JSON.stringify(trainigData), "data.v0.json", "text/plain")
}