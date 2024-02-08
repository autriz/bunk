<script lang="ts">
    import type { Player } from "$lib/data";
    import type { PlayerProperties } from "$lib/internal/gameState";

    let className: HTMLDivElement["className"] = "";
    export let forceShow: boolean;
    export let prop: Player[PlayerProperties];
    export { className as class };

    let clicked = false;

    $: if (forceShow) clicked = true;
</script>

<button 
	on:click={() => {clicked = !clicked}}
	class="{className} w-[200px] h-[40px] overflow-hidden text-center dark:bg-slate-700 bg-gray-200 rounded-sm hover:bg-gray-400 dark:hover:bg-slate-500 transition-colors"
>
    <p 
    class:hidden={!clicked && !forceShow} 
    class="[&.hidden]:text-transparent whitespace-nowrap overflow-hidden text-clip text-secondary-foreground transition-colors pointer-events-none"
    >
        {Array.isArray(prop) ? prop.join(", ") : prop}
    </p>
</button>