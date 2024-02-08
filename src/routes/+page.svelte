<script lang="ts">
    import PlayersTable from "$lib/new-components/PlayersTable.svelte";
	import { createDialog, melt } from "@melt-ui/svelte";
	import { X } from "lucide-svelte";
    import { fade } from "svelte/transition";
    import PrettyButton from "$lib/components/PrettyButton.svelte";
    import { flyAndScale } from "$lib/utils/transition";

    import { generatePlayersArray, Player } from "$lib/data";
    import { setCtx } from "$lib/game";
    import { Direction } from "$lib/internal/gameState";

	const {
		elements: {
			overlay,
			content,
			title,
			description,
			close,
			portalled,
		},
		states: { open },
	} = createDialog({ forceVisible: false });
	
	const { 
		states: { playersStore, catastropheStore }, 
		methods 
	} = setCtx();

	function copyPlayersToClipboard() {
		if ($playersStore === undefined) return;

		navigator.clipboard.writeText($playersStore.map(player => player.toString()).join("\n\n"));
	}

	let unique = {};

	function initPlayers() {
		if (playerAmount && playerAmount !== 0) {
			methods.start(playerAmount);
			copyPlayersToClipboard();
			unique = {};
			playerAmount = null;
		}
	}

	let playerAmount: number | null = null;
</script>

<svelte:head>
	<title>Бункер</title>
	<meta name="description" content="Bunker" />
</svelte:head>

<div class="min-w-fit w-screen min-h-fit h-screen bg-secondary text-secondary-foreground">
	{#if !$playersStore || $playersStore.length === 0}
		<div class="w-full h-full flex flex-col justify-center items-center">
			<h1 class="text-4xl font-semibold mb-8">Бункер</h1>
			<p class="text-secondary-foreground/80 mb-4">WIP</p>
			<PrettyButton on:click={(e) => $open = !$open}>Начать игру</PrettyButton>
		</div>
	{:else}
		<div class="w-full h-full flex flex-col justify-center items-center">
			<div class="m-3 flex flex-row gap-3">
				<PrettyButton on:click={(e) => $open = !$open}>Новая игра</PrettyButton>
				<PrettyButton on:click={(e) => copyPlayersToClipboard()}>Скопировать карточки</PrettyButton>
			</div>
			<h1 class="text-xl text-center">{$catastropheStore}</h1>
			{#key unique}
				<PlayersTable bind:players={$playersStore} />
			{/key}
		</div>
	{/if}
</div>

<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
				max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-secondary
				p-6 shadow-lg text-secondary-foreground"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium">
			Начать игру
			</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-secondary-foreground/80">
			Задайте количество игроков и определённые параметры.
			</p>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right" for="name"> Количество игроков </label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
							rounded-sm border border-solid px-3 leading-none text-secondary-foreground dark:text-secondary"
					id="name"
					type="number"
					placeholder="0"
					bind:value={playerAmount}
				/>
			</fieldset>

			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
							px-4 font-medium leading-none hover:bg-red-600 transition-colors"
				>
					Отмена
				</button>
				<button
					use:melt={$close}
					on:click={initPlayers}
					class="inline-flex h-8 items-center justify-center rounded-sm
							bg-magnum-100 px-4 font-medium leading-none text-magnum-900 hover:bg-primary transition-colors"
				>
					Начать
				</button>
			</div>

			<button
			use:melt={$close}
			aria-label="close"
			class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
					items-center justify-center rounded-full p-1 text-magnum-800
					hover:bg-magnum-100 focus:shadow-magnum-400"
			>
			<X class="square-4" />
			</button>
		</div>
	{/if}
</div>
