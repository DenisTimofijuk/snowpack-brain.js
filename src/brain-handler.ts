import brain from 'brain.js';
import trainingData from './trainingData.json';
import {saveTrainedData} from './helper/saveTrainedData';
import pretrainedData from './pretrainedData.json';

export const network = new brain.NeuralNetwork({
  hiddenLayers:[20, 40, 20, 15, 10]
});

// trainAndSave();

network.fromJSON(pretrainedData);


const mapScreen = document.getElementById('display-map')!;

mapScreen.innerHTML = brain.utilities.toSVG(network);


function trainAndSave() {
    network.train(trainingData.numbers);
    saveTrainedData(network.toJSON());
}
