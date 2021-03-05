import type brain from 'brain.js';

export function saveTrainedData(jsonData:brain.INeuralNetworkJSON) {

    download(JSON.stringify(jsonData), "json-file-name.json", "text/plain")

    function download(content:string, fileName:string, contentType:string) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
}