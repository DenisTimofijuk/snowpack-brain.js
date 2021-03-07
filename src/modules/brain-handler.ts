import brain from 'brain.js';
import trainingData from '../JSON/training/data.v1.json';
import {saveTrainedData} from '../helper/saveTrainedData';
import pretrainedData from '../JSON/pretrained/data.vx.json';

export const network = new brain.NeuralNetwork();

const USE_PRETRAINED_DATA = false;
const ENABLE_DOWNLOAD_OF_TRAINED_DATA = false;

if(USE_PRETRAINED_DATA){
    //@ts-ignore
    network.fromJSON(pretrainedData);
}else{
    trainAndSave();
}

const mapScreen = document.getElementById('display-map')!;
//@ts-ignore
mapScreen.innerHTML = brain.utilities.toSVG(network,{
    height: 300,
    width: 400
});


function trainAndSave() {
    const statusLabel = document.getElementById('display-training-status')!;
    statusLabel.innerHTML = 'Training started please wait...';
    disableControls(true);
    network.trainAsync(trainingData.numbers).then((res) => {
        statusLabel.innerHTML = JSON.stringify(res);
        disableControls(false);
        ENABLE_DOWNLOAD_OF_TRAINED_DATA && saveTrainedData(network.toJSON());
    }).catch((e)=> {
        console.log('Error', e);
    })
}

function disableControls(flag:boolean) {
    const button_compute = document.getElementById('init-process')! as HTMLButtonElement;
    const button_animation = document.getElementById('show-training-data')! as HTMLButtonElement;
    
    if(flag){
        button_compute.value = 'Training started please wait...';
        button_animation.value = 'Training started please wait...';
    }else{
        button_compute.value = 'Compute result...';
        button_animation.value = 'Show training data animation';
    }

    button_compute.disabled = flag;
    button_animation.disabled = flag;
}