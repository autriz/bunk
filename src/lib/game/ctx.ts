// import { createViewer, type CreateSVGViewerProps } from "$lib/internal/index.js";
import { createGameState } from "$lib/internal/gameState";
import { getContext, setContext } from "svelte";

const GAME_STATE_ROOT = Symbol('GAME_STATE_ROOOT');

export function setCtx() {
    const state = createGameState();

    setContext(GAME_STATE_ROOT, { ...state });

    return {
        ...state
    };
}

export function getCtx() {
    return getContext<ReturnType<typeof setCtx>>(GAME_STATE_ROOT);
}