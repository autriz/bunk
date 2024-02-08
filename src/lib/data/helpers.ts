import { getRandomNumber, Player } from ".";

import data from "./data.json";

export function generatePlayersArray(amount: number, names: Array<string>): Player[] {
    return Array.from({length: amount}, (_v, k) => new Player(names[k]));
}

export function getRandomData(key: keyof typeof data) {
    return data[key][Math.floor(Math.random() * data[key].length)];
}

export function getRandomCatastrophe() {
    return getRandomData("catastrophes");
}

export function getRandomPlace() {
    return getRandomData("place");
}

export function getRandomFood() {
    return getRandomData("provision");
}

export function getRandomItem() {
    return getRandomData("items");
}

export function getRandomThreat() {
    return getRandomData("threats");
}

export function getBunkerHistory() {
    const catastrophe = getRandomCatastrophe();
    const place = getRandomPlace();
    const size = getRandomNumber(50, 1000);
    const time = getRandomNumber(6, 180);
    const food = getRandomFood();
    const items = Array.from({length: getRandomNumber(2, 5)}, (v) => getRandomItem());
    const threat = getRandomThreat();

    return `${catastrophe}\n Бункер находится: ${place}\n Площадь бункера: ${size} м2.\n Время нахождения: ${time} месяцев.\n Провизия: ${food}\n Предметы: ${items.join(", ")}.\n ${threat}`;
}

export function getRandomHealth(): string {
    let isHealthy = Math.floor(Math.random() * 100);
    return isHealthy > 70 ? "Полностью здоров" : getRandomData("health_statuses");
}