<script lang="ts">
    import { getRandomHealth, type Player } from "$lib/data";
    import { fade } from "svelte/transition";
    import PlayerRow from "./PlayerRow.svelte";
    import { createContextMenu, melt } from "@melt-ui/svelte";
    import { Direction, type PlayerProperties } from "$lib/internal/gameState";
    import { getCtx } from "$lib/game";

    export let players: Player[];

    let currentColumn: PlayerProperties | null = null;

    const { methods } = getCtx();

    const {
        elements: { trigger, menu, item, separator },
        builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
        states: { open }
    } = createContextMenu({
        loop: true,
    });

    const {
        elements: { 
            subMenu: subMenuA, 
            subTrigger: subTriggerA 
        }
    } = createSubmenu();

    const {
        elements: { radioGroup, radioItem },
        helpers: { isChecked },
    } = createMenuRadioGroup({
    });

    function moveProp(key: PlayerProperties | null, direction: Direction) {
        if (key) {
            methods.moveProp(key, direction);
        }
    }

    $: if ($open === false) {
        console.log('close');
        currentColumn = null;
    }
</script>

<div class="bg-card border border-border rounded-lg p-2 shadow-lg">
    <table>
        <thead>
            <tr>
                <th>Ник</th>
                <th 
                    use:melt={$trigger} 
                    on:contextmenu={() => currentColumn = "generalInfo"}
                >
                    Пол, возраст, деторождение
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "bodyType"}
                >
                    Телосложение
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "professions"}
                >
                    Профессия
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "health"}
                >
                    Здоровье
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "trait"}
                >
                    Черта
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "hobbies"}
                >
                    Хобби
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "phobia"}
                >
                    Фобия
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "additionalInfo"}
                >
                    Доп. информация
                </th>
                <th 
                    use:melt={$trigger}
                    on:contextmenu={() => currentColumn = "items"}
                >
                    Багаж
                </th>
                <th>Карта действия №1</th>
                <th>Карта действия №2</th>
                <th 
                    use:melt={$trigger}
                >
                    Дисквалифицирован</th>
            </tr>
        </thead>
        <tbody>
            {#each players as player}
                <PlayerRow bind:player={player} />
            {/each}
        </tbody>
    </table>
    <div class="menu" use:melt={$menu}>
        <button 
          class="item" 
          use:melt={$item}
          on:click={() => moveProp(currentColumn, Direction.CLOCKWISE)}
        >
          Сдвиг вверх
        </button>
        <button 
          class="item" 
          use:melt={$item}
          on:click={() => moveProp(currentColumn, Direction.COUNTERCLOCKWISE)}
        >
          Сдвиг вниз
        </button>
    </div>
</div>

<style lang="postcss">
    th {
        @apply p-3 border border-border;
    }

    .menu {
      @apply z-10 flex max-h-[300px] min-w-[220px] flex-col shadow;
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