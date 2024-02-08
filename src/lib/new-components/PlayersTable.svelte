<script lang="ts">
    import { getRandomHealth, Hobby, Player, Profession } from "$lib/data";
    import { fade } from "svelte/transition";
    import { createContextMenu, melt } from "@melt-ui/svelte";
    import { Direction, type PlayerProperties } from "$lib/internal/gameState";
    import { getCtx } from "$lib/game";
    import HideableText from "./HideableText.svelte";
    import { Clipboard, Key } from "lucide-svelte";

    export let players: Player[];

    let currentColumn: PlayerProperties | null = null;
    let currentPlayerIdx: number = -1;

    const { methods } = getCtx();

    const {
        elements: { 
            trigger: triggerA, 
            menu: menuA, 
            item: itemA, 
            separator: separatorA 
        },
        builders: { 
            createSubmenu: createSubmenuA
        },
        states: { open: openA }
    } = createContextMenu({
        loop: true,
    });

    const {
        elements: { 
            trigger: triggerB, 
            menu: menuB, 
            item: itemB, 
            separator: separatorB 
        },
        builders: { 
            createSubmenu: createSubmenuB
        },
        states: { open: openB }
    } = createContextMenu({
        loop: true,
    });

    const {
        elements: { 
            subMenu: subMenuB, 
            subTrigger: subTriggerB 
        }
    } = createSubmenuB();

    const {
        elements: { 
            subMenu: subMenuС, 
            subTrigger: subTriggerС 
        }
    } = createSubmenuB();

    const {
        elements: { 
            subMenu: subMenuD, 
            subTrigger: subTriggerD 
        }
    } = createSubmenuB();

    let propKeys = Object.getOwnPropertyNames(players[0])
        .filter((val) => 
            val !== "isDisqualified" && 
            val !== "id" && 
            val !== "actionCards" && 
            val !== "name"
        ) as PlayerProperties[];

    let propNames = [
        "Пол, возраст, деторождение", 
        "Телосложение", 
        "Профессия", 
        "Здоровье", 
        "Черта", 
        "Хобби",
        "Фобия",
        "Доп. информация",
        "Багаж"
    ];

    $: playerNames = players.map((player) => player.name);

    function moveProp(key: PlayerProperties | null, direction: Direction) {
        if (key) {
            methods.moveProp(key, direction);
        }
    }

    function regeneratePlayerProp(key: PlayerProperties | null, playerIdx: number) {
        if (key && playerIdx >= 0) {
            methods.regeneratePlayerProp(key, playerIdx);
        }
    }

    function swapProp(key: PlayerProperties | null, player1Idx: number, player2Idx: number) {
        if (key && player1Idx >= 0 && player2Idx >= 0) {
            methods.swapProps(key, player1Idx, player2Idx);
        }
    }

    function updatePlayerProp<T extends PlayerProperties>(key: T | null, playerIdx: number, value: Player[T]) {
        if (key && playerIdx >= 0) {
            methods.updatePlayerProp(key, playerIdx, value);
        }
    }

    function appendPlayerProp<T extends PlayerProperties>(key: T | null, toPlayerIdx: number, fromPlayerIdx: number) {
        if (key && (key === "hobbies" || key === "professions" || key === "items") && toPlayerIdx > 0 && fromPlayerIdx > 0) {
            methods.appendPlayerProp(key, toPlayerIdx, fromPlayerIdx);
        }
    }

    function stealPlayerProp<T extends PlayerProperties>(key: T | null, toPlayerIdx: number, fromPlayerIdx: number) {
        if (key && key === "items" && toPlayerIdx > 0 && fromPlayerIdx > 0) {
            methods.stealPlayerProp(key, toPlayerIdx, fromPlayerIdx);
        }
    }

    function copyPlayerProp<T extends PlayerProperties>(key: T | null, playerIdx: number) {
        if (key && playerIdx >= 0) {
            let player = players.at(playerIdx);

            if (player) {
                navigator.clipboard.writeText(`${player.getByKey(key)}`);
            }
        }
    }

    $: if (!$openA) {
        currentColumn = null;
    }

    $: if (!$openB) {
        currentColumn = null;
        currentPlayerIdx = -1;
    }
</script>

<div class="m-2 p-6 grid xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 6xl:grid-cols-7 gap-3 overflow-auto">
    {#each players as player, playerIdx}
        <div class="flex flex-col p-2 {!player.isDisqualified ? "bg-card" : "dark:bg-zinc-950 bg-gray-300"} border border-border rounded-lg shadow-lg transition-colors">
            <div class="text-center my-3">
                <input 
                    class="bg-transparent text-2xl border-b border-secondary-foreground" 
                    type="text"
                    bind:value={player.name}
                    on:change={() => methods.updatePlayerProp("name", playerIdx, player.name)}
                />
            </div>
            <table>
                {#each propKeys as prop, propIdx}
                    <tr>
                        <th
                            use:melt={$triggerA}
                            on:contextmenu={() => currentColumn = prop}
                        >
                            {propNames[propIdx]}
                        </th>
                        <td 
                            class="relative"
                            use:melt={$triggerB}
                            on:contextmenu={() => {currentColumn = prop; currentPlayerIdx = playerIdx;}}
                        >
                            <HideableText
                                bind:forceShow={player.isDisqualified}
                                prop={player.getByKey(prop)}
                            />
                        </td>
                    </tr>
                {/each}
                {#each player.actionCards as card, cardIdx}
                    <tr>
                        <th>Карта действия №{cardIdx + 1}</th>
                        <td class="relative">
                            <HideableText 
                                bind:forceShow={player.isDisqualified}
                                prop={card}
                            />
                        </td>
                    </tr>
                {/each}
            </table>
            <div class="grow" />
            <div class="flex justify-center items-baseline mt-2">
                <button 
                    class="min-w-[200px] p-3 dark:bg-slate-700 bg-slate-300 rounded-md transition-colors {player.isDisqualified ? "dark:hover:bg-primary/80 hover:bg-primary/80" : "dark:hover:bg-red-600/80 hover:bg-red-600/80"}"
                    on:click={() => player.isDisqualified = !player.isDisqualified}
                >
                    {!player.isDisqualified ? "Дисквалифицировать" : "Вернуть"}
                </button>
            </div>
        </div>
    {/each}
</div>
<div class="menu" use:melt={$menuA}>
    <button 
      class="item" 
      use:melt={$itemA}
      on:click={() => moveProp(currentColumn, Direction.CLOCKWISE)}
    >
      Сдвиг влево
    </button>
    <button 
      class="item" 
      use:melt={$itemA}
      on:click={() => moveProp(currentColumn, Direction.COUNTERCLOCKWISE)}
    >
      Сдвиг вправо
    </button>
</div>
<div class="menu" use:melt={$menuB}>
    <button 
      class="item" 
      use:melt={$itemB}
      on:click={() => copyPlayerProp(currentColumn, currentPlayerIdx)}
    >
      Копировать
    </button>
    <button 
      class="item" 
      use:melt={$itemB}
      on:click={() => regeneratePlayerProp(currentColumn, currentPlayerIdx)}
    >
      Перегенерировать
    </button>
    <div class="item" use:melt={$subTriggerB}>Поменяться с...</div>
    <div class="menu subMenu" use:melt={$subMenuB}>
        {#each playerNames as name, nameIdx}
            {#if nameIdx !== currentPlayerIdx}
                <button 
                    class="item" 
                    use:melt={$itemB}
                    on:click={() => swapProp(currentColumn, currentPlayerIdx, nameIdx)}
                >
                    {name}
                </button>
            {/if}
        {/each}
    </div>
    {#if currentColumn === "items"}
        <div class="item" use:melt={$subTriggerС}>Передать...</div>
        <div class="menu subMenu" use:melt={$subMenuС}>
            {#each playerNames as name, nameIdx}
                {#if nameIdx !== currentPlayerIdx}
                    <button 
                        class="item" 
                        use:melt={$itemB}
                        on:click={() => stealPlayerProp(currentColumn, nameIdx, currentPlayerIdx)}
                    >
                        {name}
                    </button>
                {/if}
            {/each}
        </div>
    {/if}
    {#if currentColumn === "professions" || currentColumn === "hobbies"}
        <!-- TODO: learn other's profession/hobby -->
        <div class="item" use:melt={$subTriggerD}>Научиться у...</div>
        <div class="menu subMenu" use:melt={$subMenuD}>
            {#each playerNames as name, nameIdx}
                {#if nameIdx !== currentPlayerIdx}
                    <button 
                        class="item" 
                        use:melt={$itemB}
                        on:click={() => { appendPlayerProp(currentColumn, currentPlayerIdx, nameIdx); }}
                    >
                        {name}
                    </button>
                {/if}
            {/each}
        </div>
    {/if}
    {#if currentColumn === "health"}
        <button 
            class="item" 
            use:melt={$itemB}
            on:click={() => updatePlayerProp(currentColumn, currentPlayerIdx, "Полностью здоров")}
        >
            Излечиться
        </button>
    {/if}
</div>

<style lang="postcss">
    th, td {
        @apply p-3 border border-border cursor-default;
    }

    .menu {
      @apply z-10 flex max-h-[300px] min-w-[220px] flex-col shadow text-lg;
      @apply rounded-lg bg-secondary p-1 lg:max-h-none;
      @apply ring-0 !important;
    }
    .subMenu {
      @apply min-w-[220px] shadow-md shadow-neutral-900/30;
    }
    .item {
      @apply relative h-6 min-h-[24px] select-none rounded-md pl-6 pr-1 transition-colors;
      @apply z-20 text-secondary-foreground outline-none;
      @apply data-[highlighted]:bg-primary/20 data-[highlighted]:text-primary/80;
      @apply data-[disabled]:text-neutral-300;
      @apply flex items-center text-sm leading-none;
      @apply ring-0 !important;
    }
  
    .trigger {
      @apply block rounded-xl border-2 border-dashed border-primary/90 font-semibold text-primary/70;
      @apply w-[300px] bg-primary/10 py-12 text-center shadow;
    }
    .check {
      @apply absolute left-2 top-1/2 text-primary/50;
      translate: 0 calc(-50% + 1px);
    }
  
    .dot {
      @apply h-[4.75px] w-[4.75px] rounded-full bg-primary/90;
    }
  
    .separator {
      @apply m-[5px] h-[1px] bg-primary/20;
    }
  
    .rightSlot {
      @apply ml-auto pl-5;
    }
  
    .check {
      @apply absolute left-0 inline-flex w-6 items-center justify-center;
    }
    .text {
      @apply pl-6 text-xs leading-6 text-neutral-600;
    }
</style>