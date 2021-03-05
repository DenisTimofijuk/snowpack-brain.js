import brain from 'brain.js';
import trainingData from '../JSON/trainingData.v0.json';
import {saveTrainedData} from '../helper/saveTrainedData';
import pretrainedData from '../JSON/pretrainedData.v0.json';

export const network = new brain.NeuralNetwork();

const USE_PRETRAINED_DATA = true;

if(USE_PRETRAINED_DATA){
    //@ts-ignore
    network.fromJSON(pretrainedData);
}else{
    trainAndSave();
}

const mapScreen = document.getElementById('display-map')!;
//@ts-ignore
mapScreen.innerHTML = brain.utilities.toSVG(network);


function trainAndSave() {
    network.train(trainingData.numbers);
    saveTrainedData(network.toJSON());
}
