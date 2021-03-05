import brain from 'brain.js';
import trainingData from './trainingData.json';
import {saveTrainedData} from './helper/saveTrainedData';
import pretrainedData from './pretrainedData.json';

export const network = new brain.NeuralNetwork();

const USE_PRETRAINED_DATA = true;

if(USE_PRETRAINED_DATA){
    network.fromJSON(pretrainedData);
}else{
    trainAndSave();
}

const mapScreen = document.getElementById('display-map')!;
mapScreen.innerHTML = brain.utilities.toSVG(network);


function trainAndSave() {
    network.train(trainingData.numbers);
    saveTrainedData(network.toJSON());
}
