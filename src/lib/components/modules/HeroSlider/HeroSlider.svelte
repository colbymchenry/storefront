<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
</script>
<!--TODO: Figure out blocks-->
<div class="w-full">
    <Component {schema} let:props>
        <div class={`flex flex-col bg-black`} style={`height: ${props.height}vh;`}>
            {#each props.getBlocks("Slide") as block}
                {#if block.image}
                    <img src={block.image} loading="lazy" alt={props.alt}/>
                {/if}
            {/each}
        </div>
    </Component>
</div>

<style lang="scss">
    img {
      @apply w-full h-full object-cover;
    }
</style>