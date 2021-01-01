import {fetchData} from "./dataHandler.js";
import View from "./view.js";

const start = () => {
    const view = new View();
    fetchData(view.displayCards);
}

start();
