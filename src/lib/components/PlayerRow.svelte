<script lang="ts">
    import { type Player } from "$lib/data";
    import TableCell from "./TableCell.svelte";
    import TableCellWithMenu from "./TableCellWithMenu.svelte";

    export let player: Player;

    let forceShow: boolean = false;

    let propKeys = Object.getOwnPropertyNames(player)
        .filter((val) => val !== "isDisqualified" && val !== "id" && val !== "name");
    $: props = propKeys
        .map((val) => Object.getOwnPropertyDescriptor(player, val)!.value)
        .flat();
</script>

<tr>
    <TableCell 
        forceShow={true}
        prop={player.name}
    />
    {#each props as prop}
        <TableCellWithMenu 
            bind:forceShow={player.isDisqualified} 
            bind:prop
            on:moveTo={(user) => console.log(`Передать ${user.detail}`)}
            on:regenerate={(item) => console.log("Реген")}
        />
    {/each}
    <!-- <div>
        <p class="flex flex-row items-center justify-center">
            <HideableText bind:forceShow={player.isDisqualified}>{Gender[player.gender]}</HideableText>, 
            <HideableText bind:forceShow={player.isDisqualified}>{player.age}</HideableText>
        </p>
    </div>
    <div>
        <p class="flex flex-row items-center justify-center">
            <HideableText bind:forceShow={player.isDisqualified}>{Hobby[player.hobby]}, {player.hobbyExperience} месяцев</HideableText>
        </p>
    </div> -->
    <td class="p-3 border border-border">
        <button 
            class="p-1 bg-slate-700 rounded-md transition-colors {player.isDisqualified ? "hover:bg-primary/80" : "hover:bg-red-600/80"}"
            on:click={() => player.isDisqualified = !player.isDisqualified}
        >
            {!player.isDisqualified ? "Дисквалифицировать" : "Вернуть к жизни"}
        </button>
    </td>
</tr>