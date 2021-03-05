import brain from 'brain.js';
import trainingData from '../JSON/training/data.v0.json';
import {saveTrainedData} from '../helper/saveTrainedData';
import pretrainedData from '../JSON/pretrained/data.v0.json';

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
mapScreen.innerHTML = brain.utilities.toSVG(network,{
    height: 400,
    width: 700
});


function trainAndSave() {
    console.log('Training started...');

    network.trainAsync(trainingData.numbers).then((res) => {
        console.log('Training finished', res);
        saveTrainedData(network.toJSON());
    }).catch((e)=> {
        console.log('Error', e);
    })
}
