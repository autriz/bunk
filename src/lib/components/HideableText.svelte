<script lang="ts">

    let className: HTMLDivElement["className"] = "";
    export let forceShow: boolean;
    export let text: string;
    export { className as class };

    let clicked = false;

    $: if (forceShow) clicked = true;
</script>

<button 
	on:click={() => {clicked = !clicked}}
	class="{className} min-w-[100px] max-w-[200px] h-[30px] overflow-hidden bg-slate-700 rounded-sm hover:bg-slate-500 transition-colors text-center"
>
    <p 
    class:hidden={!clicked && !forceShow} 
    class="[&.hidden]:text-transparent whitespace-nowrap text-clip text-secondary-foreground transition-colors pointer-events-none"
    >
        {text}
    </p>
</button>