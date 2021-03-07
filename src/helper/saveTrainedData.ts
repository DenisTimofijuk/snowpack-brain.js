import type brain from 'brain.js';

export function saveTrainedData(jsonData:brain.INeuralNetworkJSON) {
    saveToFile(JSON.stringify(jsonData), "data.v0.json", "text/plain")
}

export function saveToFile(content:string, fileName:string, contentType:string) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}