import {fetchData} from "./dataHandler.js";
import {View} from "./view.js";

const start = () => {
    let view = new View();
    fetchData(view.displayCards);
}

start();
