<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
</script>

<div class="w-full">
    <Component {schema} let:props>
        <div class={`flex relative bg-black`} style={`height: ${props.height}vh;`}>
            {#each props.getBlocks("Slide").filter((b) => b.image) as block, index}
                <img src={block.image} loading="lazy" alt={props.alt} class="absolute top-0 left-0 w-full h-full transition"
                style={`margin-left: calc(100vw * ${index});`}/>
            {/each}

            <div class={`grid grid-rows-3 top-0 left-0 w-full h-full z-10 p-4 text-${props.controlsColor}`}>
                <div></div>
                <div class="flex justify-between align-center w-full h-full">
                    <button type="button" class="opacity-80 hover:opacity-100 transition">
                        <span class="material-symbols-outlined bg-black pl-2 py-1 bg-opacity-60 rounded-full">arrow_back_ios</span>
                    </button>
                    <button type="button" class="opacity-80 hover:opacity-100 transition">
                        <span class="material-symbols-outlined bg-black px-1 py-1 bg-opacity-60 rounded-full">arrow_forward_ios</span>
                    </button>
                </div>
                <div class="flex justify-center items-end h-full">
                    {#each props.getBlocks("Slide") as block}
                        {#if block.image}
                            <button type="button" class="opacity-80 hover:opacity-100 transition">
                                <span class="material-symbols-outlined mx-1 shadow-2xl">radio_button_unchecked</span>
                            </button>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </Component>
</div>

<style lang="scss">
  img {
    @apply w-full h-full object-cover;
  }
</style>