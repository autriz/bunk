import { writable, get } from "svelte/store";
import { Player, generatePlayersArray, getRandomCatastrophe } from "$lib/data";

type ExcludeMethods<T> = 
    { [K in keyof T as (T[K] extends Function ? never : K)]: T[K] }

export type PlayerProperties =  keyof ExcludeMethods<Player>;

export enum Direction {
    CLOCKWISE,
    COUNTERCLOCKWISE,
}

export function createGameState() {
    let playersStore = writable<Player[] | undefined>(undefined);
    let catastropheStore = writable<string | undefined>(undefined);

    function swapProps(key: PlayerProperties, player1Idx: number, player2Idx: number) {
        if (player1Idx < 0 || player2Idx < 0) return;

        playersStore.update(($players) => {
            if ($players === undefined) return $players;

            let player1 = $players.at(player1Idx);
            let player2 = $players.at(player2Idx);

            if (player1 && player2) {
                let temp = player1.getByKey(key);
                player1.updateByKey(key, player2.getByKey(key));
                player2.updateByKey(key, temp);
            }

            return $players;
        })
    }

    function updatePlayerProp<T extends PlayerProperties>(key: T, playerIdx: number, value: Player[T]) {
        if (playerIdx < 0) return;

        playersStore.update(($players) => {
            if ($players === undefined) return $players;

            let player = $players.at(playerIdx);

            if (player) {
                player.updateByKey(key, value);
            }

            return $players;
        })
    }

    function regenerateProp(key: PlayerProperties) {
        playersStore.update(($players) => {
            if ($players === undefined) return $players;

            for (let player of $players) {
                player.regenerateByKey(key);
            }

            return $players;
        })
    }

    function moveProp(key: PlayerProperties, direction: Direction) {
        playersStore.update(($players) => {
            if ($players === undefined) return $players;

            let keyProps = $players
                .map((player, idx) => ({ value: player.getByKey(key), skip: player.isDisqualified }))
                .filter((val) => !val.skip);

            let idxs = $players
                .map((player, idx) => ({ idx: idx, skip: player.isDisqualified }))
                .filter((val) => !val.skip);

            console.log(keyProps);

            if (direction === Direction.CLOCKWISE) {
                let val = keyProps.shift();

                if (val) keyProps.push(val);
            }
            else {
                let val = keyProps.pop();

                if (val) keyProps.unshift(val);
            }

            keyProps.map((prop, idx) => {
                $players[idxs[idx]!.idx].updateByKey(key, prop.value);
            });

            return $players;
        })
    }

    function regeneratePlayerProp(key: PlayerProperties, playerIdx: number) {
        if (playerIdx < 0) return;

        playersStore.update(($players) => {
            if ($players === undefined) return $players;

            let player = $players.at(playerIdx);

            if (player) {
                player.regenerateByKey(key);
            }

            return $players;
        })
    }

    function start(playerAmount: number, names?: string[]) {
        catastropheStore.set(getRandomCatastrophe());

        playersStore.update(($players) => {
            $players = Array.from(
                {length: playerAmount}, 
                (_v, k) => { 
                    let name = names && names[k] ? names[k] : "";
                    
                    return new Player(name); 
                }
            );

            return $players;
        })
    }

    function restart() {
        playersStore.update(($players) => {
            if ($players === undefined) return $players;

            for (let player of $players) {
                player.regenerateAll();
            }

            return $players;
        })
    }

    return {
        states: {
            playersStore,
            catastropheStore
        },
        methods: {
            swapProps,
            regenerateProp,
            regeneratePlayerProp,
            updatePlayerProp,
            moveProp,
            start,
            restart
        }
    }
}