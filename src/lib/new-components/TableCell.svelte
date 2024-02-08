<script lang="ts">
    import HideableText from "./HideableText.svelte";

    export let forceShow: boolean;
    export let prop: any;
</script>

<td class="p-3 border border-border">
    <p 
        class="flex flex-row items-center justify-center"
    >
      {#if prop.key !== "name"}
        <HideableText 
            bind:forceShow
            bind:prop={prop}
        />
      {:else}
        <p>{prop}</p>
      {/if}
    </p>
</td>