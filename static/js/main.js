import {fetchData} from "./dataHandler.js";
import {View} from "./view.js";
import {Logic} from "./logic.js";

const start = () => {
    const logic = new Logic();
    const view = new View(logic);
    fetchData(view.displayCards);
}

start();
