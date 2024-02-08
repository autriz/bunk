<script lang="ts">
    let isPressed = false;
</script>

<button
    class:active={isPressed} 
    class="dark:bg-slate-700 bg-slate-300 [&.active]:bg-primary/50 [&.active]:translate-y-1 [&.active]:shadow-[0_5px] [&.active]:shadow-slate-600 p-4 transition-all rounded-md shadow-[0_9px] shadow-slate-500 dark:hover:bg-primary/80 hover:bg-primary/80"
    on:mousedown={() => isPressed = true}
    on:mouseup={() => isPressed = false}
    on:click
    {...$$props}
>
    <slot />
</button>