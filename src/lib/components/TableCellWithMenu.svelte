<script lang="ts">
    import { createContextMenu, melt } from "@melt-ui/svelte";
    import HideableText from "./HideableText.svelte";
    import { createEventDispatcher } from "svelte";

    export let forceShow: boolean;
    export let prop: any;

    const dispatch = createEventDispatcher();

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
</script>

<td class="p-3 border border-border">
    <p 
        class="flex flex-row items-center justify-center"
        use:melt={$trigger}
    >
      {#if prop.key !== "name"}
        <HideableText 
            bind:forceShow
            bind:text={prop}
        />
      {:else}
        <p>{prop}</p>
      {/if}
    </p>
    <div class="menu" use:melt={$menu}>
        <button 
          class="item" 
          use:melt={$item}
          on:click={() => dispatch("regenerate", prop)}
        >
          Перегенерировать
        </button>
        <div class="item" use:melt={$subTriggerA}>Передать...</div>
        <div class="menu subMenu" use:melt={$subMenuA}>
            <button 
              class="item" 
              use:melt={$item}
              on:click={() => dispatch("moveTo", "Письке")}
            >
              Письке
            </button>
        </div>
    </div>
</td>

<style lang="postcss">
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