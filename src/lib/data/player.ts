import type { PlayerProperties } from "$lib/internal/gameState";
import { getRandomData, getRandomHealth } from ".";

export class GeneralInfo {
    public gender: string;
    public age: number;
    public childbearing: string;

    constructor() {
        this.gender = getRandomData("gender");
        this.age = getRandomNumber(14, 110);
        this.childbearing = getRandomData("childbearing");
    }

    regenerate() {
        this.gender = getRandomData("gender");
        this.age = getRandomNumber(14, 110);
        this.childbearing = getRandomData("childbearing");
    }

    toString() {
        return `${this.gender}, ${this.age} лет, ${this.childbearing}`;
    }
}

export class Profession {
    public profession: string;
    public experience: number;

    constructor(profession?: string, experience?: number) {
        if (profession && experience) {
            this.profession = profession;
            this.experience = experience;
        }
        else {
            this.profession = getRandomData("professions");
            this.experience = getRandomNumber(0, 240);
        }
    }

    regenerate() {
        this.profession = getRandomData("professions");
        this.experience = getRandomNumber(0, 240);
    }

    toString() {
        return `${this.profession}, ${(this.experience / 12).toFixed(0)} лет`;
    }
}

export class Hobby {
    public hobby: string;
    public experience: number;

    constructor(hobby?: string, experience?: number) {
        if (hobby && experience) {
            this.hobby = hobby;
            this.experience = experience;
        }
        else {
            this.hobby = getRandomData("hobbies");
            this.experience = getRandomNumber(0, 240);
        }
    }

    regenerate() {
        this.hobby = getRandomData("hobbies");
        this.experience = getRandomNumber(0, 240);
    }

    toString() {
        return `${this.hobby}, ${(this.experience / 12).toFixed(0)} лет`;
    }
}

export class Player {
    public id: string;
    public name: string;
    public generalInfo: GeneralInfo;
    public bodyType: string;
    public professions: Profession[];
    public health: string;
    public trait: string;
    public hobbies: Hobby[];
    public phobia: string;
    public additionalInfo: string;
    public items: string[];
    public actionCards: string[];
    public isDisqualified: boolean;

    constructor(name: string) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name ?? "";
        this.generalInfo = new GeneralInfo();
        this.bodyType = getRandomData("body_types");
        this.professions = [new Profession()];
        this.health = getRandomHealth();
        this.trait = getRandomData("traits");
        this.hobbies = [new Hobby()];
        this.phobia = getRandomData("phobias");
        this.additionalInfo = getRandomData("additional_info");
        this.items = Array.from({length: 1}, (_v) => getRandomData("baggages"));
        this.actionCards = Array.from({length: 2}, (_v) => getRandomData("action_cards"));
        this.isDisqualified = false;
    }

    regenerateAll() {
        this.generalInfo = new GeneralInfo();
        this.bodyType = getRandomData("body_types");
        this.professions = [new Profession()];
        this.health = getRandomData("health_statuses");
        this.trait = getRandomData("traits");
        this.hobbies = [new Hobby()];
        this.phobia = getRandomData("phobias");
        this.additionalInfo = getRandomData("additional_info");
        this.items = Array.from({length: 1}, (_v) => getRandomData("baggages"));
        this.actionCards = Array.from({length: 2}, (_v) => getRandomData("action_cards"));
    }

    regenerateByKey(key: PlayerProperties) {
        switch (key) {
            case "generalInfo":
                this.generalInfo.regenerate();
                break;
            case "bodyType":
                this.bodyType = getRandomData("body_types");
                break;
            case "professions":
                this.professions.map(profession => profession.regenerate());
                break;
            case "health":
                this.health = getRandomData("health_statuses");
                break;
            case "trait":
                this.trait = getRandomData("traits");
                break;
            case "hobbies":
                this.hobbies.map(hobby => hobby.regenerate());
                break;
            case "phobia":
                this.phobia = getRandomData("phobias");
                break;
            case "additionalInfo":
                this.additionalInfo = getRandomData("additional_info");
                break;
            case "items":
                this.items = Array.from({length: 1}, (_v) => getRandomData("baggages"));
                break;
            case "actionCards":
                this.actionCards = Array.from({length: 2}, (_v) => getRandomData("action_cards"));
                break;
        }
    } 

    getByKey(key: PlayerProperties) {
        switch (key) {
            case "id":
                return this.id;
            case "name":
                return this.name;
            case "generalInfo":
                return this.generalInfo;
            case "bodyType":
                return this.bodyType;
            case "professions":
                return this.professions;
            case "health":
                return this.health;
            case "trait":
                return this.trait;
            case "hobbies":
                return this.hobbies;
            case "phobia":
                return this.phobia;
            case "additionalInfo":
                return this.additionalInfo;
            case "items":
                return this.items;
            case "actionCards":
                return this.actionCards;
            case "isDisqualified":
                return this.isDisqualified;
        }
    }

    updateByKey<T extends PlayerProperties>(key: T, value: Player[T]) {
        switch (key) {
            case "name":
                this.name = value as Player["name"];
                break;
            case "generalInfo":
                this.generalInfo = value as Player["generalInfo"];
                break;
            case "bodyType":
                this.bodyType = value as Player["bodyType"];
                break;
            case "professions":
                this.professions = value as Player["professions"];
                break;
            case "health":
                this.health = value as Player["health"];
                break;
            case "trait":
                this.trait = value as Player["trait"];
                break;
            case "hobbies":
                this.hobbies = value as Player["hobbies"];
                break;
            case "phobia":
                this.phobia = value as Player["phobia"];
                break;
            case "additionalInfo":
                this.additionalInfo = value as Player["additionalInfo"];
                break;
            case "items":
                this.items = value as Player["items"];
                break;
            case "actionCards":
                this.actionCards = value as Player["actionCards"];
                break;
            case "isDisqualified":
                this.isDisqualified = value as Player["isDisqualified"];
                break;
        }
    }

    toString() {
        return `${this.name !== "" ? `Ник: ${this.name}\n` : ``}` +
            `Пол, возраст, деторождение: ${this.generalInfo}\n` +
            `Телосложение: ${this.bodyType}\n` +
            `Профессия: ${this.professions.join("; ")}\n` +
            `Состояние здоровья: ${this.health}\n` +
            `Человеческая черта: ${this.trait}\n` +
            `Хобби: ${this.hobbies.join("; ")}\n` +
            `Фобия: ${this.phobia}\n` +
            `Дополнительная Информация: ${this.additionalInfo}\n` +
            `Багаж: ${this.items.join(", ")}\n` +
            this.actionCards.map((card, idx) => { return `Карта действия №${idx+1}: ${card}`; }).join("\n");
    }
}

export function getRandomNumber(from: number, to: number) {
    return from + Math.floor(Math.random() * (to - from + 1));
}